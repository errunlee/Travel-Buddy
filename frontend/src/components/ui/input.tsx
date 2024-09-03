import * as React from "react";

import { cn } from "@/lib/utils";
import { Form } from "react-router-dom";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  form: any;
  name: string;
  label: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, form, name, label, icon, type, ...props }, ref) => {
    return (
      <Form>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="inline-block w-full text-start text-md">
                {label}
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  {icon && (
                    <span className="absolute left-3 flex items-center justify-center text-neutral-500">
                      {icon}
                    </span>
                  )}
                  <input
                    {...field}
                    type={type}
                    className={cn(
                      `flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${
                        icon ? "pl-10" : "!pl-2"
                      }`,
                      // Add padding if icon is present
                      className
                    )}
                    ref={ref}
                    {...props}
                  />
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  }
);
Input.displayName = "Input";

export { Input };
