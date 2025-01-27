import { cn } from "@/libs/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Pressable, StyleProp, Text, TextStyle } from "react-native";

const buttonTextVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "",
      outline: "text-black group-active:text-white",
      secondary: "",
      ghost: "",
      link: "group-active:underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonVariants = cva("group justify-center items-center", {
  variants: {
    variant: {
      default: "bg-black active:bg-black/80 disabled:bg-gray-500",
      destructive: "",
      outline: "border border-black active:bg-black",
      secondary: "",
      ghost: "active:bg-black/10 ",
      link: "",
    },
    size: {
      default: "p-3 rounded-xl min-h-12",
      sm: "p-2 rounded-xl min-h-10",
      lg: "px-4 py-5 rounded-xl min-h-18",
      icon: "h-10 w-10 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = {
  left?: boolean;
  label?: string;
  textClassName?: string;
  children?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
} & VariantProps<typeof buttonVariants> &
  ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      textClassName,
      textStyle,
      left = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}

        {size !== "icon" && (
          <Text
            className={cn(
              buttonTextVariants({ variant, size, className }),
              textClassName,
            )}
            style={textStyle}
          >
            {label}
          </Text>
        )}
      </Pressable>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
