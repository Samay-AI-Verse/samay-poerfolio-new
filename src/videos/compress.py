import cv2
import os

input_video = r"d:\My Self\portfolio-samay\src\videos\Intro.mp4"
output_video = r"d:\My Self\portfolio-samay\src\videos\Intro_compressed.mp4"

cap = cv2.VideoCapture(input_video)
if not cap.isOpened():
    print("Error opening input video!")
    exit(1)

fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Original properties: {width}x{height} @ {fps} fps")

# For high performance, resize to 854x480 (standard 480p) or 960x540.
# 480p is absolutely perfect for a web background. It loads instantly and plays smoothly on all devices!
target_width = 854
scale = target_width / width
if scale < 1.0:
    target_height = int(height * scale)
else:
    target_width = width
    target_height = height

print(f"Target properties: {target_width}x{target_height} @ {fps} fps")

# Let's try codecs sequentially and verify with out.isOpened()
codecs = [
    ('mp4v', '.mp4'),
    ('avc1', '.mp4'),
    ('XVID', '.avi'),
    ('MJPG', '.avi')
]

out = None
chosen_codec = None
final_output_path = output_video

for codec, ext in codecs:
    test_output = output_video.replace('.mp4', ext)
    print(f"Trying codec '{codec}' with extension '{ext}'...")
    fourcc = cv2.VideoWriter_fourcc(*codec)
    out = cv2.VideoWriter(test_output, fourcc, fps, (target_width, target_height))
    
    if out.isOpened():
        print(f"Successfully initialized VideoWriter with codec '{codec}'!")
        chosen_codec = codec
        final_output_path = test_output
        break
    else:
        print(f"Codec '{codec}' failed.")

if not chosen_codec or not out or not out.isOpened():
    print("All standard codecs failed! Trying fallback writing...")
    exit(1)

frame_count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Downscale frame
    if scale < 1.0:
        frame = cv2.resize(frame, (target_width, target_height), interpolation=cv2.INTER_AREA)
        
    out.write(frame)
    frame_count += 1
    if frame_count % 100 == 0:
        print(f"Processed {frame_count} frames...")

cap.release()
out.release()
print("Compression complete!")

original_size = os.path.getsize(input_video)
if os.path.exists(final_output_path):
    compressed_size = os.path.getsize(final_output_path)
    print(f"Original size: {original_size / (1024*1024):.2f} MB")
    print(f"Compressed size: {compressed_size / (1024*1024):.2f} MB")
    print(f"Output saved at: {final_output_path}")
else:
    print("Compression failed, output file not found.")
