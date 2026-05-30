interface QuestionBlockProps {
  value: {
    description: string;
    example?: string;
  };
}

export default function QuestionBlock({ value }: QuestionBlockProps) {
  if (!value?.description) return null;

  return (
    <div className="mb-6 rounded-xl overflow-hidden border-toc border">
      <div className="px-5 py-1.5 text-xs font-medium uppercase tracking-wider bg-WhiteCoffee text-stamp border-toc border-b">
        題目
      </div>
      <div className="px-5 py-4 text-sm leading-[1.8] text-articletitle bg-PaleOrange">
        {value.description}
      </div>
      {value.example && (
        <div className="px-5 py-3 text-xs font-mono whitespace-pre-wrap leading-relaxed bg-SugarQuill text-Kabul border-t border-toc">
          {value.example}
        </div>
      )}
    </div>
  );
}
