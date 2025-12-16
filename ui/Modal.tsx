import { Close } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type ModalPosition = "center" | "bottom";

type ModalProps = {
  open: boolean;
  setOpen: (value?: boolean) => void;
  title?: string;
  children: ReactNode;
  position?: ModalPosition;
  showHeader?: boolean;
  containerStyle?: ViewStyle;
};

export function Modals({
  open,
  setOpen,
  title,
  children,
  position = "center",
  showHeader = true,
  containerStyle,
}: ModalProps) {
  const { colors } = useTheme();

  const isBottom = position === "bottom";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}
    >
      <View
        style={[
          styles.overlay,
          isBottom ? styles.overlayBottom : styles.overlayCenter,
        ]}
      >
        {/* Backdrop - tap to close */}
        <Pressable style={styles.backdrop} onPress={() => setOpen(!open)} />

        {/* Modal Content */}
        <View
          style={[
            styles.modalView,
            isBottom ? styles.modalViewBottom : styles.modalViewCenter,
            { backgroundColor: colors.background || Colors.default.white },
            containerStyle,
          ]}
        >
          {/* Handle bar for bottom sheet */}
          {isBottom && (
            <View style={styles.handleBar}>
              <View
                style={[
                  styles.handleIndicator,
                  { backgroundColor: colors.text || Colors.default.gray },
                ]}
              />
            </View>
          )}

          {showHeader && (
            <View style={styles.headerModal}>
              <Text style={[styles.titleHeaderModal, { color: colors.text }]}>
                {title}
              </Text>
              <Close onPress={() => setOpen(!open)} fill={colors.text} />
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}

// Reusable Bottom Sheet component for convenience
export function BottomSheet({
  open,
  setOpen,
  title,
  children,
  showHeader = true,
  containerStyle,
}: Omit<ModalProps, "position">) {
  return (
    <Modals
      open={open}
      setOpen={setOpen}
      title={title}
      position="bottom"
      showHeader={showHeader}
      containerStyle={containerStyle}
    >
      {children}
    </Modals>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  overlayCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlayBottom: {
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    backgroundColor: Colors.default.white,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewCenter: {
    margin: 20,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  modalViewBottom: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    paddingBottom: 34, // Safe area padding for bottom
  },
  handleBar: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 8,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.default.gray,
    opacity: 0.5,
  },
  headerModal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleHeaderModal: {
    fontSize: 18,
    fontWeight: "600",
  },
});
