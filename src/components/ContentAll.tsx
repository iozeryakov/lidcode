import { FC, useContext, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { IInfoContent, IInfoContentAll } from "../types/IInfo";
import { Pages } from "./Pages";
import { Panel } from "./Panel";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import useAxios from "../hooks/useAxios";
import { $authHost } from "../api/axiosApi"
import { Loading } from "./Loading";

export const ContentAll: FC<IInfoContentAll> = observer(({ name, filter, loadingF }: IInfoContentAll) => {
  const { user, modal } = useContext(Context)
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const [CountList, setCountList] = useState<number[]>([]);
  const [contentAll, setContentAll] = useState<IInfoContent[]>([])
  const [data, errorData, loadingData, axiosFetchData] = useAxios();
  const [remove, errorRemove, loadingRemove, axiosFetchRemove] = useAxios();

  const isVisible = contentAll.length !== 0 && !loadingData && !loadingRemove && !loadingF

  const getData = () => {

    axiosFetchData({
      axiosInstance: $authHost,
      method: "get",
      url: "api/v1/" + name + "/",
      requestConfig: {
        params: filter && filter !== "1" ? { Columns: "id, name", onList: page, event_id: filter } : { Columns: name === "users" ? "id, login AS name" : "id, name", onList: page, }
      }
    });
  }

  const DeleteRemove = (id: string) => {
    axiosFetchRemove({
      axiosInstance: $authHost,
      method: "delete",
      url: "api/v1/" + name + "/",
      requestConfig: { params: { id: id } }
    });
  }

  const select = (checked: boolean) => {
    if (checked === true) {
      setContentAll((prev) => prev.map((i) => ({ ...i, checked: true })));
      setSelectAll(checked);
    } else {
      setContentAll((prev) => prev.map((i) => ({ ...i, checked: false })));
      setSelectAll(checked);
    }
  }

  const removeFunction = () => {
    if (user.access !== "2") {
      modal.setIsVisible("Нет доступа!", true)
    } else if (name === "users" && contentAll.filter(i => i.checked && i.name === user.user).length) {
      modal.setIsVisible("Нельзя удалять самого себя!", true)
    } else {
      if (contentAll.filter(i => i.checked).length) {
        setContentAll([])
        DeleteRemove(contentAll.filter(i => i.checked).map(i => (i.id)).join(", "))
      }
    }
  }

  useEffect(() => {

    if (remove?.token && !loadingRemove && errorRemove.length === 0) {
      user.newToken(remove.token)
      modal.setIsVisible("Успешно удалено", false)
    } else if (remove?.status && !loadingRemove && errorRemove.length === 0) {
      user.newToken("")
    } else { errorRemove.length && modal.setIsVisible("Ошибка удаления", true) }

    // eslint-disable-next-line 
  }, [remove, errorRemove, loadingRemove])

  useEffect(() => {
    if (user.isAuth && !loadingRemove) {
      getData();
    }
    // eslint-disable-next-line 
  }, [user.isAuth, loadingRemove, page, loadingF, filter])
  useEffect(() => {
    setContentAll([]);
    setCountList([])
  }, [page, data])

  useEffect(() => {
    if (data?.token) {
      user.newToken(data.token)
      if (data?.Items) {
        data.Items.map(i => setContentAll(prev => [...prev, { id: i.id, name: i.name, checked: false }]));
        data.Items.length === 0 && page !== 1 && setPage(1)

      }
      if (data?.CountList) {
        for (let i = 1; i < (data.CountList / 10) + 1; i++) {
          setCountList(prev => [...prev, i])
        }
      }
    } else if (data?.status) {
      user.newToken("")
    }

    // eslint-disable-next-line 
  }, [data])

  useEffect(() => {
    if (
      contentAll.filter((i) => i.checked === true).length === contentAll.length
    ) {
      contentAll.length ?
        setSelectAll(true) : setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  }, [contentAll]);


  return (
    <>
      <Panel selectAll={selectAll} select={select} remove={removeFunction} />
      {isVisible ? contentAll.map((i) => (
        <div key={i.id} className="flex flex-row justify-start items-center h-[50px]  w-full border-b-[3px] border-[#F3F4F6] overflow-hidden">
          <div className="flex flex-row border-r-[3px] border-[#F3F4F6]  h-full items-center px-[10px] sx:px-5 sm:px-[30px]  md:px-5  l:px-[30px]">
            <input
              type="checkbox"
              id={"check_" + i.id}
              checked={i.checked}
              onChange={(e) =>
                setContentAll((prev) =>
                  prev.map((item) =>
                    item.id === i.id
                      ? { ...i, checked: e.target.checked }
                      : item
                  )
                )
              }
              className=" h-4 w-4 sx:h-5 sx:w-5"
            />
          </div>
          <Link
            id={"elem_" + i.id}
            to={name === "users" ? "#" : i.id.toString()}
            className=" standart_text cursor-pointer overflow-hidden  px-[10px] sx:px-5 sm:px-[30px] md:px-5  l:px-[30px] h-full  flex items-center w-full"
          >
            <div className="text-ellipsis whitespace-nowrap overflow-hidden">{i.name}</div>

          </Link>
        </div>

      )) :
        <Loading loading={loadingData || loadingRemove || (loadingF ? loadingF : false)} error={errorData.length !== 0} />
      }

      {isVisible && <Pages page={page} CountList={CountList} setPage={setPage} />}
    </>
  );
});
