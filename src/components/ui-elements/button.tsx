import { cva, VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 font-medium transition focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        green: "bg-green text-white",
        dark: "bg-dark text-white dark:bg-white/10",
        outlinePrimary:
          "border border-primary hover:bg-primary/10 text-primary",
        outlineGreen: "border border-green hover:bg-green/10 text-green",
        outlineDark:
          "border border-dark hover:bg-dark/10 text-dark dark:hover:bg-white/10 dark:border-white/25 dark:text-white",
      },
      shape: {
        default: "",
        rounded: "rounded-[5px]",
        full: "rounded-full",
      },
      size: {
        default: "py-3.5 px-10 py-3.5 lg:px-8 xl:px-10",
        small: "py-[11px] px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    label: string;
    icon?: React.ReactNode;
    loading?: boolean;
  };

export function Button({
  label,
  icon,
  variant,
  shape,
  size,
  className,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading || props.disabled}
      className={
        buttonVariants({ variant, shape, size }) +
        (className ? ` ${className}` : "")
      }
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Menyimpan..." : label}
      {!loading && icon && <span>{icon}</span>}
    </button>
  );
}
