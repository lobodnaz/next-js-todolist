import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Input, Pagination, Select } from "antd";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

interface Props {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number, pageSize: number) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sortOptions = [
  {
    label: (
      <>
        <FaSortAmountDownAlt style={{ marginRight: 8 }} />
        Date
      </>
    ),
    value: "date_desc",
  },
  {
    label: (
      <>
        <FaSortAmountUpAlt style={{ marginRight: 8 }} />
        Date
      </>
    ),
    value: "date_asc",
  },
  {
    label: (
      <>
        <SortAscendingOutlined style={{ marginRight: 8 }} />
        Title
      </>
    ),
    value: "title_asc",
  },
  {
    label: (
      <>
        <SortDescendingOutlined style={{ marginRight: 8 }} />
        Title
      </>
    ),
    value: "title_desc",
  },
  {
    label: (
      <>
        <CheckCircleOutlined style={{ marginRight: 8 }} />
        Completed
      </>
    ),
    value: "completion_desc",
  },
  {
    label: (
      <>
        <CloseCircleOutlined style={{ marginRight: 8 }} />
        Incompleted
      </>
    ),
    value: "completion_asc",
  },
];

const ListHeader = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onSortChange,
  onSearchChange,
}: Props) => {
  return (
    <div className="list-header">
      <Input
        className="custom-search-input"
        placeholder="Search"
        variant="underlined"
        allowClear
        maxLength={200}
        onChange={onSearchChange}
      />
      <Select
        style={{ width: 220, marginLeft: 8 }}
        defaultValue="date_asc"
        options={sortOptions}
        onChange={onSortChange}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={onPageChange}
        showLessItems
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
      />
    </div>
  );
};

export default ListHeader;
