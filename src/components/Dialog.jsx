import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AiFillDelete } from "react-icons/ai";

const Dialog = ({ handleSubmit, data }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="p-1 hover:text-red-600 hover:bg-slate-200 hover:shadow-md hover:rounded-full transition-all">
          <AiFillDelete />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/25 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your
            article and remove your data from our servers.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-slate-400 bg-slate-100 hover:bg-slate-200 focus:shadow-slate-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action
              asChild
              onClick={() => {
                handleSubmit(data);
              }}
            >
              <button className="text-red-500 bg-red-100 hover:bg-red-200 focus:shadow-red-200 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] transition-colors">
                Yes, delete article
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Dialog;
