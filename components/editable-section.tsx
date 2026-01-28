import { type PageSection } from "@/lib/pages-api";

interface EditableSectionProps {
  section: PageSection | null;
  fallback: React.ReactNode;
  className?: string;
}

/**
 * EditableSection component that renders content from the database
 * or falls back to hardcoded content if no database content exists.
 *
 * Automatically adds data-section-id and data-field-id attributes
 * for visual editor integration.
 */
export function EditableSection({
  section,
  fallback,
  className = "",
}: EditableSectionProps) {
  // If no database content, render original hardcoded content
  if (!section) {
    return <>{fallback}</>;
  }

  // Render a single field with data-field-id attribute
  const renderField = (field: {
    id: string;
    fieldType: string;
    fieldContent: string;
    metadata?: Record<string, any>;
  }) => {
    const { fieldType, fieldContent, metadata } = field;
    const fieldId = field.id.substring(0, 8); // Short ID for data attribute

    // Render headings
    if (fieldType.startsWith("h")) {
      const headingClass = "font-display font-bold text-foreground";

      switch (fieldType) {
        case "h1":
          return (
            <h1 className={`text-4xl md:text-5xl lg:text-6xl ${headingClass} mb-6`} data-field-id={fieldId}>
              {fieldContent}
            </h1>
          );
        case "h2":
          return (
            <h2 className={`text-3xl md:text-4xl ${headingClass} mb-4`} data-field-id={fieldId}>
              {fieldContent}
            </h2>
          );
        case "h3":
          return (
            <h3 className={`text-2xl md:text-3xl ${headingClass} mb-3`} data-field-id={fieldId}>
              {fieldContent}
            </h3>
          );
        case "h4":
          return (
            <h4 className={`text-xl ${headingClass} mb-2`} data-field-id={fieldId}>
              {fieldContent}
            </h4>
          );
        case "h5":
          return (
            <h5 className={`text-lg ${headingClass} mb-2`} data-field-id={fieldId}>
              {fieldContent}
            </h5>
          );
        case "h6":
          return (
            <h6 className={`text-base ${headingClass} mb-2`} data-field-id={fieldId}>
              {fieldContent}
            </h6>
          );
      }
    }

    // Render paragraph
    if (fieldType === "p") {
      return (
        <p className="text-foreground/70 mb-4 leading-relaxed" data-field-id={fieldId}>
          {fieldContent}
        </p>
      );
    }

    // Render unordered list
    if (fieldType === "ul") {
      const items = fieldContent.split("\n").filter((item) => item.trim());
      return (
        <ul className="text-foreground/70 mb-4 leading-relaxed space-y-2 list-disc list-inside" data-field-id={fieldId}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }

    // Render ordered list
    if (fieldType === "ol") {
      const items = fieldContent.split("\n").filter((item) => item.trim());
      return (
        <ol className="text-foreground/70 mb-4 leading-relaxed space-y-2 list-decimal list-inside" data-field-id={fieldId}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    }

    // Render button
    if (fieldType === "button") {
      const url = metadata?.url || "#";
      return (
        <a
          href={url}
          className="inline-block px-6 py-3 bg-gold hover:bg-gold-dark text-foreground font-medium rounded-lg transition-colors"
          data-field-id={fieldId}
        >
          {fieldContent}
        </a>
      );
    }

    return null;
  };

  // Render section with data-section-id attribute
  return (
    <div className={className} data-section-id={section.id}>
      {section.fields.map((field) => (
        <div key={field.id}>{renderField(field)}</div>
      ))}
    </div>
  );
}

export default EditableSection;
