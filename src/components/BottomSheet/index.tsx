import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import type { ReactNode } from 'react';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

type BottomSheetProps = {
  children: ReactNode;
  snapPoints?: Array<string | number>;
  onClose?: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, snapPoints: customSnapPoints, onClose }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

    const snapPoints = useMemo(
      () => customSnapPoints ?? ['85%'],
      [customSnapPoints],
    );

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.present();
      },
      close: () => {
        bottomSheetRef.current?.dismiss();
      },
    }));

    const renderBackdrop = (
      props: React.ComponentProps<typeof BottomSheetBackdrop>,
    ) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    );

    return (
      <GorhomBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={onClose}
      >
        <BottomSheetScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </GorhomBottomSheetModal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;