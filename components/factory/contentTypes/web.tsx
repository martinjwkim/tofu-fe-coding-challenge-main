import React, { useEffect, useRef, useState } from "react";
import Spinner from "@/components/core/spinner";
import {
  tofuElementClass,
  tofuHoveredElement,
  selectDecorator,
} from "@/utils/factoryHelpers";
import { ShapedContentData } from "@/types";
import { useUpdateContentGroup } from "@/hooks/api/contentGroup";

const WEBSITE_IFRAME_HTML_ID = "website-iframe";

type WebProps = {
  content: ShapedContentData;
};

function buildComponentPayload(element: Element): {
  meta: Record<string, unknown>;
  text: string;
} {
  const tag = (element.tagName?.toLowerCase() ?? "span") as string;
  const prev = element.previousElementSibling;
  const next = element.nextElementSibling;
  return {
    meta: {
      type: "text",
      html_tag: `<${tag}>`,
      time_added: Date.now(),
      html_tag_index: null,
      selected_element: (element as HTMLElement).outerHTML,
      preceding_element: prev ? (prev as HTMLElement).outerHTML : "",
      succeeding_element: next ? (next as HTMLElement).outerHTML : "",
    },
    text: (element.textContent?.trim() ?? "") as string,
  };
}

/** Setup selection classes and click/hover on .tofu-element nodes. Returns cleanup. */
function setupIframeInteractions(
  doc: Document,
  content: ShapedContentData,
  updateContentGroup: (params: {
    id: number;
    payload: { components: Record<string, any> };
  }) => Promise<unknown>
): () => void {
  const { contentGroup, components } = content;

  const componentIds = Object.keys(components);
  const selectedIds = new Set(componentIds);
  const idToIndex: Record<string, number> = {};
  componentIds.forEach((id, i) => {
    idToIndex[id] = i + 1;
  });

  const tofuElements = doc.querySelectorAll(`.${tofuElementClass}`);
  const cleanupFns: Array<() => void> = [];

  tofuElements.forEach((el) => {
    const id = el.getAttribute?.("data-tofu-id") ?? null;
    const isSelected = id !== null && selectedIds.has(id);
    el.classList.toggle(selectDecorator, isSelected);
    if (isSelected && idToIndex[id] !== undefined) {
      el.setAttribute("data-tofu-curr-num-before", String(idToIndex[id]));
    } else {
      el.removeAttribute("data-tofu-curr-num-before");
    }

    const onMouseEnter = () => el.classList.add(tofuHoveredElement);
    const onMouseLeave = () => el.classList.remove(tofuHoveredElement);

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      if (!id || typeof contentGroup !== "number") return;

      if (components[id]) {
        const { [id]: _, ...rest } = components;
        updateContentGroup({
          id: contentGroup,
          payload: { 
            components: { ...rest } },
        });
      } else {
        updateContentGroup({
          id: contentGroup,
          payload: { 
            components: { ...components, [id]: buildComponentPayload(el) },
          },
        });
      }
    };

    el.addEventListener("click", handleClick);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    cleanupFns.push(() => {
      el.removeEventListener("click", handleClick);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    });
  });

  return () => cleanupFns.forEach((fn) => fn());
}

const Web = ({ content }: WebProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlContent, setHtmlContent] = useState<string | undefined>(undefined);
  const [iframeReady, setIframeReady] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const { updateContentGroup } = useUpdateContentGroup();

  useEffect(() => {
    let cancelled = false;
    fetch("/landing-page.html")
      .then((r) => r.text())
      .then((html) => !cancelled && setHtmlContent(html))
      .catch((err) => !cancelled && console.error("Error fetching HTML:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!iframeReady || !doc || !htmlContent) return;

    cleanupRef.current?.();
    cleanupRef.current = setupIframeInteractions(
      doc,
      content,
      updateContentGroup
    );
    return () => cleanupRef.current?.();
  }, [iframeReady, htmlContent, content, updateContentGroup]);

  return (
    <div className="relative w-full h-full">
      {!htmlContent && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <Spinner className="h-40" />
        </div>
      )}
      <iframe
        id={WEBSITE_IFRAME_HTML_ID}
        srcDoc={htmlContent}
        className="w-full h-full"
        ref={iframeRef}
        onLoad={() => setIframeReady(true)}
        referrerPolicy="no-referrer"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default Web;
