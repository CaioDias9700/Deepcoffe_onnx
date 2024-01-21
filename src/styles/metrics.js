import { Dimensions, PixelRatio } from "react-native";

const { height, width } = Dimensions.get("window");

const figmawidth = 375;

const px = (valuePx) => {
  const widthPercent = (valuePx / figmawidth) * 100;
  const screenPixel = PixelRatio.roundToNearestPixel(
    (width * parseFloat(widthPercent)) / 100
  );
  return screenPixel;
};

export const metrics = {
  px,
};
