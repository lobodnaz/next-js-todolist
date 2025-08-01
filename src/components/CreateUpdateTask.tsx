import { TaskItem } from "@/models/TaskItem";
import { TaskRequest } from "@/services/tasks";
import { Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";

const { TextArea } = Input;

interface Props {
  mode: Mode;
  values: TaskItem;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleCreate: (request: TaskRequest) => void;
  handleUpdate: (id: string, request: TaskRequest) => void;
}

export enum Mode {
  Create,
  Edit,
}

const CreateUpdateTask = ({
  mode,
  values,
  isModalOpen,
  handleCancel,
  handleCreate,
  handleUpdate,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setTitle(values.title);
    setDescription(values.description || "");
  }, [values]);

  const handleOk = async () => {
    const taskRequest = { title, description };

    if (mode === Mode.Create) {
      handleCreate(taskRequest);
    } else {
      handleUpdate(values.id, taskRequest);
    }
  };

  return (
    <Modal
      className="custom-modal"
      title={mode === Mode.Create ? "Create task" : "Edit task"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <TextArea
        value={description}
        placeholder="Description"
        autoSize={{ minRows: 3, maxRows: 6 }}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Modal>
  );
};

export default CreateUpdateTask;
