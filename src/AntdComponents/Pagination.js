import { Pagination } from "antd";
import React from "react";
import "./AntdComponents.css";

function PaginationFilms({
  loading,
  filmData,
  totalPages,
  onPageChange,
  search,
  page
}) {
  const pagination = search ? (
    <div className="Pagination">
      {loading || filmData === null || filmData.length === 0 ? null : (
        <Pagination
          defaultCurrent={page}
          total={totalPages ? totalPages * 10 : 50}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      )}
    </div>
  ) : null;
  return pagination;
}

export default PaginationFilms;
