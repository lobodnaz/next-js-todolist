import { TaskItem } from "@/models/TaskItem";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Empty, List, Spin, Tag, Typography } from "antd";
import ListHeader from "./ListHeader";
import DateTime from "./DateTime";

const { Text } = Typography;

interface Props {
  tasks: TaskItem[];
  loading: boolean;
  handleEdit: (taskItem: TaskItem) => void;
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number, pageSize: number) => void;
  onSortChange: (values: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
}

const ToDoList = ({
  tasks,
  loading,
  handleEdit,
  handleComplete,
  handleDelete,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onSortChange,
  onSearchChange,
  searchText,
}: Props) => {
  const handleEmptyList = () => {
    if (searchText.trim()) {
      return (
        <Empty
          description={
            <Text style={{ fontSize: "16px", color: "#f0f0f0" }}>
              No matches for the query:{" "}
              <Text style={{ fontSize: "16px", color: "#b000d3" }} strong>
                {searchText}
              </Text>
            </Text>
          }
        />
      );
    } else {
      return <Empty description="Your ToDoList is empty yet!" />;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Spin spinning={loading} size="large" />
        <Text style={{ marginTop: "16px", color: "#f0f0f0" }}>
          Loading data from server...
        </Text>
      </div>
    );
  }
  return (
    <List
      className="task-list"
      itemLayout="horizontal"
      header={
        <ListHeader
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          totalItems={totalItems}
          onSortChange={onSortChange}
          onSearchChange={onSearchChange}
        />
      }
      dataSource={tasks}
      locale={{ emptyText: handleEmptyList() }}
      renderItem={(taskItem) => (
        <List.Item
          key={taskItem.id}
          className="task-list-item"
          actions={[
            <Button
              key="toggle-complete"
              onClick={() => handleComplete(taskItem.id)}
              icon={taskItem.isCompleted ? <UndoOutlined /> : <CheckOutlined />}
              className="toggle-complete-btn"
              style={{
                width: "160px",
                backgroundColor: taskItem.isCompleted
                  ? "rgba(255, 77, 79, 0.2)"
                  : "rgba(82, 196, 26, 0.2)",
                color: taskItem.isCompleted ? "#ff4d4f" : "#52c41a",
                borderColor: taskItem.isCompleted ? "#ff4d4f" : "#52c41a",
              }}
            >
              {taskItem.isCompleted ? "Mark Incomplete" : "Mark Complete"}
            </Button>,
            <Button
              key="edit"
              onClick={() => handleEdit(taskItem)}
              icon={<EditOutlined />}
              className="edit-btn"
            >
              Edit
            </Button>,
            <Button
              key="delete"
              icon={<DeleteOutlined />}
              danger
              color="red"
              variant="solid"
              onClick={() => {
                const confirmed = window.confirm(
                  `Are you sure you want to delete "${taskItem.title}"?`
                );
                if (confirmed) {
                  handleDelete(taskItem.id);
                }
              }}
            />,
          ]}
        >
          <div className="task-item-content">
            <List.Item.Meta
              title={
                <>
                  {taskItem.title}
                  {" | "}
                  {taskItem.isCompleted ? (
                    <Tag
                      icon={<CheckCircleOutlined />}
                      style={{
                        backgroundColor: "rgba(82, 196, 26, 0.2)",
                        color: "#52c41a",
                        borderColor: "#52c41a",
                      }}
                    >
                      Completed
                    </Tag>
                  ) : (
                    <Tag
                      icon={<CloseCircleOutlined />}
                      style={{
                        backgroundColor: "rgba(255, 77, 79, 0.2)",
                        color: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Incompleted
                    </Tag>
                  )}
                </>
              }
              description={taskItem.description}
            />
            <Text type="secondary" className="last-modified">
              Last modified:{" "}
              <DateTime dateTimeString={taskItem.lastTimeModified} />
            </Text>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ToDoList;
