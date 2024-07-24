import { useRecoilValue, useSetRecoilState } from "recoil";

import { modalAtom } from "./modals.atom";

const useModal = () => {
  const setModal = useSetRecoilState(modalAtom);

  const openModal = (modal: JSX.Element | JSX.Element[]) =>
    setModal({ modal, opened: true });

  const closeModal = () => setModal({ modal: <></>, opened: false });

  return { openModal, closeModal };
};

const useModalValue = () => {
  const useModalVal = useRecoilValue(modalAtom);
  return useModalVal;
};

export { useModal, useModalValue };
