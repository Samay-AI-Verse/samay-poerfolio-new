import cv2
import numpy as np

# =========================
# VIDEO PATHS
# =========================

input_video = r"D:\My Self\portfolio-samay\src\videos\Intro.mp4"
output_video = r"D:\My Self\portfolio-samay\src\videos\Intro2.mp4"

# =========================
# OPEN VIDEO
# =========================

cap = cv2.VideoCapture(input_video)

fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_video, fourcc, fps, (width, height))

print("Processing video...")

while True:

    ret, frame = cap.read()

    if not ret:
        break

    # Convert BGR to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Green color range
    lower_green = np.array([35, 40, 40])
    upper_green = np.array([85, 255, 255])

    # Create mask
    mask = cv2.inRange(hsv, lower_green, upper_green)

    # Invert mask
    mask_inv = cv2.bitwise_not(mask)

    # Remove green background
    result = cv2.bitwise_and(frame, frame, mask=mask_inv)

    # Optional black background
    background = np.zeros_like(frame)

    final = cv2.add(background, result)

    # Write frame
    out.write(final)

    # Preview
    cv2.imshow("Output", final)

    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# =========================
# RELEASE
# =========================

cap.release()
out.release()
cv2.destroyAllWindows()

print("Done!")
print("Saved to:", output_video)