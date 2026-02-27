import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b-2 border-muted border-dashed last:border-none">
      <button
        className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
        onClick={onClick}
      >
        <span
          className={cn("text-lg md:text-xl font-sans font-medium text-foreground group-hover:underline group-hover:underline-offset-4 group-hover:decoration-secondary",
            isOpen ? "underline decoration-2 underline-offset-4 decoration-secondary" : ""
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "ml-4 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-muted font-sans leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white border-2 border-muted border-dashed rounded-xl p-6 md:p-8">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};
