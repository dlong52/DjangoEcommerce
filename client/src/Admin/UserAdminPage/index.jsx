import React, { Fragment, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { deleteUser, getAllUsers, getDetailUser } from '../../services/UserService';
import CreateUserForm from '../../components/Form/CreateUserForm';
import EditUserForm from '../../components/Form/EditUserForm';
import DeleteDialog from '../../components/DeleteDialog'
import { useSelector } from 'react-redux';

const UserAdminPage = () => {
  const currentUser = useSelector((state) => state.user);
  const [id, setId] = useState(null)
  const [activeForm, setActiveForm] = useState(null);
  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });
  const query = useQuery({
    queryKey: ['userDetails', id],
    queryFn: () => getDetailUser(id),
    enabled: !!id
  });
  useEffect(() => {
    if (id && query?.data && activeForm != 'delete') {
      setActiveForm('edit');
    }
  }, [id, query?.data]);
  // const handleShowEditForm = (id) => {
  //   setId(id);
  // };

  // const handleShowDeleteForm = (id) => {
  //   setId(id);
  //   setActiveForm('delete');
  // };

  const handleShowCreateForm = () => {
    setActiveForm('create');

  };
  const closeForm = () => {
    setActiveForm(null)
    setId(null)
    refetch();
  };
  // const handleDelete = async (id) => {
  //   try {
  //     if (id) {
  //       const res = await deleteUser(id)
  //       closeForm()
  //       return res.data
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="px-6 py-3">
      {(activeForm === 'create') && <CreateUserForm closeForm={closeForm} />}
      {(activeForm === 'edit') && <EditUserForm data={query?.data} closeForm={closeForm} />}
      {/* {(activeForm === 'delete') && <DeleteDialog handleDelete={handleDelete} id={id} handleClose={closeForm} />} */}

      {(activeForm !== 'create' && activeForm !== 'edit') &&
        <Fragment>
          <div className="p-5 bg-white rounded-md shadow-lg">
            <h1 className='text-[20px] font-semibold'>Danh mục người dùng</h1>
            <div className="flex mt-4">
              <div className="flex w-[350px] rounded bg-slate-300">
                <input className=" w-full border-none bg-transparent px-3 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." />
                <button type="submit" className="m-2 rounded bg-main px-4 py-1 text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <button onClick={handleShowCreateForm} className="bg-main hover:bg-yellow-900 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-yellow-500 rounded ml-7">
                <i className="fa-solid fa-plus"></i> Thêm người dùng
              </button>
            </div>
          </div>
          <div className="mt-5">
            <table className='w-full text-center bg-white rounded-md min-w-full table-auto shadow-xl'>
              <thead>
                <tr className='font-medium text-main h-[40px] uppercase text-[16px]'>
                  <th className='bg-main text-white text-[12px] rounded-tl-md'>ID</th>
                  <th className='bg-main text-white text-[12px]'>Tên</th>
                  <th className='bg-main text-white text-[12px]'>Email</th>
                  <th className='bg-main text-white text-[12px]'>Vai trò</th>
                  <th className='bg-main text-white text-[12px] rounded-tr-md'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((user, item) => {
                    return (
                      <tr className='hover:bg-gray-100' key={item}>
                        <td className='p-3 text-base font-medium text-gray-900 whitespace-nowrap'>
                          {user?.user_id}
                        </td>
                        <td className="p-3 text-base font-medium text-gray-900 whitespace-nowrap">
                            {user?.username}{(currentUser?.user_id === user?.user_id)?"(Tôi)": ""}
                        </td>
                        <td className='p-3 text-base font-medium text-gray-950 whitespace-nowrap'>{user?.email}</td>
                        <td className='p-3 text-base font-medium text-gray-950 whitespace-nowrap'>{user?.role}</td>
                        <td className='p-3 space-x-2 whitespace-nowrap'>
                          {/* {!(currentUser?.user_id === user?.user_id) ?
                            <>
                              <button onClick={() => { handleShowEditForm(user?.user_id) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all'>Edit</button>

                              <button onClick={() => { handleShowDeleteForm(user?.user_id) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-main text-white rounded-lg hover:scale-[1.02] transition-transform'>Delete</button>
                            </>:
                            <span className='font-semibold text-gray-700'>Tôi</span>
                          } */}
                          <a href={`/admin/user/${user?.user_id}`} className='text-blue-800 font-medium underline'>Chi tiết</a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </Fragment>}
    </div>
  )
}

export default UserAdminPage
