import { Table } from 'antd';
import type { TableProps } from 'antd';
import React from 'react';

interface ReusableTableProps<T> extends Omit<TableProps<T>, 'columns' | 'expandable'> {
  columns: TableProps<T>['columns'];
  expandable?: TableProps<T>['expandable'];
}

const ReusableTable = React.memo(<T extends object>({ columns, ...props }: ReusableTableProps<T>) => {
  return (
    <Table<T>
      columns={columns}
      tableLayout="fixed"
      {...props}
    />
  );
});

ReusableTable.displayName = 'ReusableTable';

export default ReusableTable as <T extends object>(props: ReusableTableProps<T>) => JSX.Element; 