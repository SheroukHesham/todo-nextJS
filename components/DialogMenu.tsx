"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import { formSchema, formValues } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import LoadingSpinner from "./LoadingSpinner";
import { set } from "zod";

const defaultValues: Partial<formValues> = {
  title: "",
  body: "",
  completed: false,
};

export function DialogMenu() {
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(data: formValues) {
    setIsLoading(true);
    data.completed = checked;
    await createTodoAction(data);
    setIsLoading(false);
    form.reset();
    setChecked(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="completed"
                control={form.control}
                render={({ fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation="horizontal"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => setChecked((prev) => !prev)}
                    />
                    <Label htmlFor="form-rhf-demo-completed">Completed</Label>
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
                  onClick={() => {
                    form.reset();
                    setChecked(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" form="form-rhf-demo" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex space-x-2">
                    <LoadingSpinner /> Saving
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
