import { Close } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

type ModalProps = {
  open: boolean;
  setOpen: (value?: boolean) => void;
  title?: string;
  children: ReactNode;
};

export function Modals({ open, setOpen, title, children }: ModalProps) {
  return (
    <View style={styles.centeredViewModal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.centeredViewModal}>
          <View style={styles.modalView}>
            <View style={styles.headerModal}>
              <Text style={styles.titleHeaderModal}>{title}</Text>
              <Close onPress={() => setOpen(!open)} />
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.default.white,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    height: "auto",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  titleHeaderModal: {
    fontSize: 18,
    fontWeight: "500",
  },
  filterButton: {
    fontWeight: "700",
    borderRadius: 10,
  },
  filterButtonText: {
    color: Colors.default.black,
  },
});
