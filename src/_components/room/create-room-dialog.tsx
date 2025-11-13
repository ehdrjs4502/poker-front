import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateRoom } from "@/_hooks/query/rooms";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PATH } from "@/_lib/constants/path";

export default function CreateRoomDialog() {
  const { mutate: createRoom } = useCreateRoom();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const password = formData.get("password") as string;
    const maxPlayerCount = formData.get("maxPlayerCount") as string;
    const bbAmount = formData.get("bbAmount") as string;
    const sbAmount = formData.get("sbAmount") as string;

    createRoom(
      {
        request: {
          title: title,
          password: password,
          maxPlayerCount: Number(maxPlayerCount),
          bbAmount: Number(bbAmount),
          sbAmount: Number(sbAmount),
        },
      },
      {
        onSuccess: (data) => {
          toast.success("방 생성에 성공했습니다.");
          //TODO: 방 생성 후 방으로 이동
          router.push(PATH.ROOM(data.data.roomId));
          console.log(data.data.roomId);
        },
        onError: (err: unknown) => {
          const errorMessage =
            err && typeof err === "object" && "response" in err
              ? (err as { response: { data: { message: string } } }).response.data.message
              : "방 생성에 실패했습니다.";
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle>Create Room</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2">
              <label htmlFor="title">방 이름</label>
              <Input id="title" name="title" type="text" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">방 비밀번호</label>
              <Input id="password" name="password" type="password" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="maxPlayerCount">최대 플레이어 수</label>
              <Input id="maxPlayerCount" name="maxPlayerCount" type="number" min={2} max={8} defaultValue={2} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="bbAmount">빅 블라인드</label>
              <Input id="bbAmount" name="bbAmount" type="number" min={1} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="sbAmount">스몰 블라인드</label>
              <Input id="sbAmount" name="sbAmount" type="number" min={1} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button type="submit">Create Room</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
