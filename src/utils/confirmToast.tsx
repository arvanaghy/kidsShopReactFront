import toast from "react-hot-toast";

export const confirmToast = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const id = toast(
      (t: any) => (
        <div className="">
          <p>{message}</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded"
              onClick={() => {
                resolve(true);
                toast.remove(t.id);
              }}
            >
              تأیید
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                resolve(false);
                toast.remove(t.id);
              }}
            >
              لغو
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });
};
