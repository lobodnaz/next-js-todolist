"use client";

import CreateUpdateTask, { Mode } from "@/components/CreateUpdateTask";
import ToDoList from "@/components/ToDoList";
import { TaskItem } from "@/models/TaskItem";
import {
  createTask,
  deleteTask,
  getPagSortTasks,
  TaskRequest,
  updateTask,
  updateTaskStatus,
} from "@/services/tasks";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Tasks() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [mode, setMode] = useState(Mode.Create);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState<TaskItem>({
    title: "",
    description: "",
  } as TaskItem);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchedText, setSearchedText] = useState<string>("");
  const [debounceSearchedText] = useDebounce(searchedText, 1000);

  useEffect(() => {
    const getTasks = async () => {
      const response = await getPagSortTasks(
        currentPage,
        pageSize,
        sortBy,
        sortOrder,
        debounceSearchedText
      );

      setLoading(false);
      setTasks(response.items);
      setTotalItems(response.totalCount);
    };

    getTasks();
  }, [currentPage, pageSize, sortBy, sortOrder, debounceSearchedText]);

  const handleCreateTask = async (request: TaskRequest) => {
    try {
      await createTask(request);
      SuccessMessage("Successfuly created!");
      closeModal();

      const response = await getPagSortTasks(
        currentPage,
        pageSize,
        sortBy,
        sortOrder,
        debounceSearchedText
      );
      setTasks(response.items);
      setTotalItems(response.totalCount);
    } catch (error: any) {
      if (error.general) {
        ErrorMessage(error.general);
      } else {
        ErrorMessage(error);
      }
    }
  };

  const handleUpdateTask = async (id: string, request: TaskRequest) => {
    try {
      await updateTask(id, request);
      SuccessMessage("Successfuly edited!");
      closeModal();

      const response = await getPagSortTasks(
        currentPage,
        pageSize,
        sortBy,
        sortOrder,
        debounceSearchedText
      );
      setTasks(response.items);
    } catch (error: any) {
      if (error.general) {
        ErrorMessage(error.general);
      } else {
        ErrorMessage(error);
      }
    }
  };

  const handleUpdateTaskStatus = async (id: string) => {
    await updateTaskStatus(id);

    const response = await getPagSortTasks(
      currentPage,
      pageSize,
      sortBy,
      sortOrder,
      debounceSearchedText
    );
    setTasks(response.items);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    SuccessMessage("Deleted!");

    const response = await getPagSortTasks(
      currentPage,
      pageSize,
      sortBy,
      sortOrder,
      debounceSearchedText
    );
    setTasks(response.items);
    setTotalItems(response.totalCount);
  };

  const openModal = () => {
    setMode(Mode.Create);
    setIsModalOpen(true);
  };

  const openEditModal = (task: TaskItem) => {
    setMode(Mode.Edit);
    setValues(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ErrorMessage = (errorMessage: string) => {
    messageApi.open({
      type: "error",
      content: errorMessage,
      duration: 2,
    });
  };

  const SuccessMessage = (successMessage: string) => {
    messageApi.open({
      type: "success",
      content: successMessage,
      duration: 2,
    });
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSortChange = (values: string) => {
    const [newSortBy, newSortOrder] = values.split("_");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchedText(value);
  };

  return (
    <div>
      {contextHolder}
      <Button
        onClick={openModal}
        icon={<PlusCircleFilled />}
        iconPosition="end"
        className="add-task-btn"
      >
        ADD NEW TASK
      </Button>
      <CreateUpdateTask
        mode={mode}
        values={values}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateTask}
        handleUpdate={handleUpdateTask}
        handleCancel={closeModal}
      />
      <ToDoList
        tasks={tasks}
        loading={loading}
        handleEdit={openEditModal}
        handleComplete={handleUpdateTaskStatus}
        handleDelete={handleDeleteTask}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        searchText={debounceSearchedText}
      />
    </div>
  );
}
