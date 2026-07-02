"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Plus } from "lucide-react";
import { createTodoAction } from "@/actions/todo.actions";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Tile must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  body: z
    .string()
    .max(100, "Description must be at most 100 characters.")
    .optional(),
});

export type formValues = z.infer<typeof formSchema>;

const defaultValues: Partial<formValues> = {
  title: "",
  body: "",
};

export function DialogMenu() {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(data: formValues) {
    await createTodoAction(data);
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            New Todo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              Add a new todo here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Add the title of your task."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="body"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        placeholder="Add the details of your task."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {/* <FieldDescription>
                      Add the details of your task.
                    </FieldDescription> */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Field orientation="horizontal">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" form="form-rhf-demo">
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
