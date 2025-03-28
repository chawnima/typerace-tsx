interface TableProps {
  content: [];
}

interface TableContent {
  username: string;
  wpm: number;
  record_date: string;
}
export const Table = ({ content }: TableProps) => {
  return (
    <table className="flex flex-col w-full gap-4 text-primary shadow-background-secondary shadow-md p-4 rounded-lg">
      <thead className="border-b border-background-primary p-2 justify-center flex w-full">
        <tr className="text-center flex justify-between gap-4 w-full">
          <th className="flex-1">Rank</th>
          <th className="flex-1">Username</th>
          <th className="flex-1">WPM</th>
        </tr>
      </thead>
      <tbody className="w-full flex flex-col max-h-60 overflow-auto">
        {content?.map((item: TableContent, index: number) => (
          <tr key={index} className="text-center flex gap-4 w-full">
            <td className="flex-1">{index + 1}</td>
            <td className="flex-1">{item?.username}</td>
            <td className="flex-1">{item?.wpm} WPM</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
