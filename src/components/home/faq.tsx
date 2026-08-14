"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ interactions — Radix Accordion (accessible disclosure widget with
 * proper ARIA and keyboard support). The server-rendered questions/answers
 * arrive as props; only the open/close state runs on the client.
 */
export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={faqs[0]?.q}>
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="text-[15px] font-semibold text-ink [&:hover]:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-[14px] leading-8 text-muted-foreground">{f.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
