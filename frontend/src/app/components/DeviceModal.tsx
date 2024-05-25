"use client";
import { FormEvent, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { useUser } from "@auth0/nextjs-auth0/client";
import * as Form from "@radix-ui/react-form";

export default function DeviceModal() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [state, setState] = useState({
    deviceLabel: "",
  });

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (userId != "") {
      const response = await fetch(
        `https://elgo-backend.vercel.app/devices/createDevice/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_label: state.deviceLabel,
            user_id: userId,
          }),
        }
      );
      if (response.ok) {
        setOpen(false);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  }

  async function getParticulars() {
    setOpen(true);
    if (user && user.email) {
      const exists = await fetch(
        `https://elgo-backend.vercel.app/users/getByEmail/${user.email}`
      );

      const details = await exists.json();
      setUserId(details.user_id);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <Dialog.Root open={open} onOpenChange={getParticulars}>
      <Dialog.Trigger asChild>
        <button
          className={
            "border-[1px] border-indigo-800 bg-indigo-800 hover:border-white hover:bg-indigo-600 rounded-md flex items-center justify-center hover:shadow-[0_1px_5px] hover:shadow-white"
          }
        >
          <div className="p-5">
            <FaPlus className="text-white text-2xl font-bold" />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-10 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gradient-to-r from-slate-800 via-white-100 to-slate-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Add New Device
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Add the following details to add a new device. Click save when
            you&apos;re done.
          </Dialog.Description>
          <Form.Root onSubmit={submitForm}>
            <Form.Field
              className="mb-[15px] flex items-center gap-5"
              name="deviceLabel"
            >
              <Form.Label className="text-violet11 w-[90px] text-right text-[15px]">
                Device Label
              </Form.Label>
              <Form.Message
                className="font-playfair text-red w-[30%] text-top text-sm"
                match="valueMissing"
              >
                Please enter your name
              </Form.Message>
              <Form.Control asChild>
                <input
                  onChange={handleChange}
                  className="text-indigo-600 shadow-black focus:shadow-indigo-600 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  value={state.deviceLabel}
                  placeholder={"Ex: Commercial Fridge"}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="mt-[25px] flex justify-end">
                  <button className="bg-indigo-600 text-white hover:border-white hover:border-1 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    Save changes
                  </button>
              </div>
            </Form.Submit>
          </Form.Root>
          <button
            onClick={() => setOpen(false)}
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <IoClose />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
