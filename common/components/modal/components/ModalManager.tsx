"use client";
import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";

import modalAtom from "@/common/recoil/modals";

import {
  bgAnimation,
  modalAnimation,
} from "../animations/ModalManager.animations";
import Portal from "../portal/components/Portal";
import { useSetContextMenu } from "@/common/recoil/contextMenu";

const ModalManager = () => {
  const [{ opened, modal }, setModal] = useRecoilState(modalAtom);
  const [portalNode, setPortalNode] = useState<HTMLElement>();
  const setContextMenu = useSetContextMenu();
  useEffect(() => {
    if (!portalNode) {
      const node = document.getElementById("portal");
      if (node) setPortalNode(node);
      return;
    }
    if (opened) {
      setContextMenu({ opened: false });
      portalNode.style.pointerEvents = "all";
    } else {
      portalNode.style.pointerEvents = "none";
    }
  }, [portalNode, opened, setContextMenu]);
  return (
    <Portal>
      <motion.div
        className="absolute z-40 flex min-h-full w-full items-center justify-center bg-black/80"
        onClick={() => setModal({ modal: <></>, opened: false })}
        variants={bgAnimation}
        initial="closed"
        animate={opened ? "opened" : "closed"}
      >
        <AnimatePresence>
          {opened && (
            <motion.div
              variants={modalAnimation}
              initial="closed"
              animate="opened"
              exit="exited"
              onClick={(e) => e.stopPropagation()}
              className="p-6"
            >
              {modal}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};

export default ModalManager;
