import { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

type Props = PressableProps & {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    scaleTo?: number;
};

export const AnimatedPressable = ({
    children,
    style,
    scaleTo = 0.97,
    onPressIn,
    onPressOut,
    ...props
}: Props) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn: NonNullable<PressableProps["onPressIn"]> = (event) => {
        scale.value = withSpring(scaleTo, {
            damping: 15,
            stiffness: 200,
        });

        onPressIn?.(event);
    };

    const handlePressOut: NonNullable<PressableProps["onPressOut"]> = (event) => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 200,
        });

        onPressOut?.(event);
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                {...props}
                style={style}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {children}
            </Pressable>
        </Animated.View>
    );
};