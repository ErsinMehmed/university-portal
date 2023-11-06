import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Chip, Tooltip } from "@nextui-org/react";
import { perPageResult } from "../../app/data";
import { isAdActive } from "../../app/utils";
import Loader from "./Loader";
import Select from "./Select";

const Table = (props) => {
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='bg-white p-3.5 rounded-t-lg shadow'>
          <h2 className='text-xl font-semibold leading-tight'>{props.title}</h2>
        </div>

        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 pb-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-b-lg overflow-hidden'>
            <table className='min-w-full leading-normal bg-white'>
              {props.isLoading ? (
                <Loader
                  numberOfRows={props.perPage}
                  cellCount={props.columns.length + 1}
                  numberOfColumn={props.columns.length + 1}
                />
              ) : (
                <>
                  <thead>
                    <tr>
                      {props.columns.map((column, index) => (
                        <th
                          className='px-4 py-3.5 border-b-2 border-[#ebf4ff] bg-[#ebf4ff] text-left text-sm font-bold text-slate-700 uppercase tracking-wider'
                          key={index}>
                          {column}
                        </th>
                      ))}

                      <th
                        colSpan={2}
                        className='px-5 text-center py-3.5 border-b-2 border-[#ebf4ff] bg-[#ebf4ff] text-sm font-bold text-slate-800 uppercase tracking-wider'>
                        Действия
                      </th>
                    </tr>
                  </thead>

                  <tbody className='bg-white'>
                    {props.data?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.entries(row).map(
                          ([key, value], cellIndex) =>
                            key !== "_id" && (
                              <td
                                className={`${
                                  cellIndex === 0
                                    ? "font-semibold text-slate-800"
                                    : "text-slate-600"
                                } px-4 py-4 border-b border-[#ebf4ff] text-sm`}
                                key={cellIndex}>
                                {(() => {
                                  switch (key) {
                                    case "creator":
                                      return value.name;
                                    case "salary":
                                      return `${value} лв.`;
                                    case "expired":
                                      const isActive = isAdActive(value);

                                      return (
                                        <Chip
                                          className='capitalize'
                                          color={
                                            isActive ? "success" : "danger"
                                          }
                                          size='sm'
                                          variant='flat'>
                                          {isActive ? "Активна" : "Изтекла"}
                                        </Chip>
                                      );
                                    default:
                                      return value;
                                  }
                                })()}
                              </td>
                            )
                        )}

                        <td className='pl-4 py-4 border-b border-[#ebf4ff]'>
                          <Tooltip content='Редактирай обявата'>
                            <button
                              type='button'
                              className='text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center transition-all'>
                              <AiFillEdit className='w-4 h-4' />
                            </button>
                          </Tooltip>
                        </td>

                        <td className='pr-4 py-4 border-b border-[#ebf4ff]'>
                          <Tooltip
                            color='danger'
                            content='Изтрий обявата'>
                            <button
                              type='button'
                              className='text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center transition-all'>
                              <AiFillDelete className='w-4 h-4' />
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>

            <div className='px-5 py-4 bg-white border-t flex  items-center justify-between'>
              <div className='w-32 h-0 -mt-10'>
                {props.isLoading ? (
                  <div className='bg-[#f4f4f5] w-14 h-8 rounded-lg px-2 pt-2 mt-1'>
                    <div className='h-1 bg-gray-200 rounded-full w-10/12 mb-2'></div>
                    <div className='h-1 bg-gray-200 rounded-full'></div>
                  </div>
                ) : (
                  <Select
                    options={perPageResult}
                    value={props.perPage}
                    onChange={(event) => props.setPerPage(event)}
                  />
                )}
              </div>

              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
