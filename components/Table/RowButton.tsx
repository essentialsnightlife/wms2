import Link from 'next/link';

const RowButton: React.FunctionComponent = ({
  link,
  text = 'Action',
}: any) => {
  return (
    <td>
      <div className="flex justify-center">
        <Link href={link}>
          <button className=" bg-blue-600 w-full rounded-md text-white outline-none focus:ring-4 shadow-lg">
            {text}
          </button>
        </Link>
      </div>
    </td>
  );
};

export { RowButton };
