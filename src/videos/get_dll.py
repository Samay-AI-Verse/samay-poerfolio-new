import urllib.request
import bz2
import os
import sys

# URL for Cisco OpenH264 1.8.0 Win64 DLL
url = "https://github.com/cisco/openh264/releases/download/v1.8.0/openh264-1.8.0-win64.dll.bz2"
bz2_path = "openh264-1.8.0-win64.dll.bz2"
dll_name = "openh264-1.8.0-win64.dll"

print("Downloading OpenH264 DLL from Cisco GitHub releases...")
try:
    urllib.request.urlretrieve(url, bz2_path)
    print("Download complete. Extracting bz2 archive...")
    
    with bz2.BZ2File(bz2_path) as fr, open(dll_name, "wb") as fw:
        fw.write(fr.read())
        
    print(f"Extraction complete! Saved DLL to: {os.path.abspath(dll_name)}")
    
    # Also copy it to the Python directory so OpenCV FFMPEG backend can definitely find it
    python_dir = os.path.dirname(sys.executable)
    dest_dll_path = os.path.join(python_dir, dll_name)
    try:
        with open(dll_name, "rb") as fs, open(dest_dll_path, "wb") as fd:
            fd.write(fs.read())
        print(f"Successfully copied DLL to Python folder: {dest_dll_path}")
    except Exception as e:
        print(f"Could not copy DLL to Python directory (permissions?): {e}")
        print("Continuing... OpenCV might find it in the current directory.")
        
    # Clean up bz2 file
    os.remove(bz2_path)
    print("Cleanup complete!")
    
except Exception as e:
    print(f"An error occurred: {e}")
