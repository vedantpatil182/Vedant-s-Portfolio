import os
from PIL import Image

def stitch_images():
    base_dir = "/Users/ankushpatil/Downloads/portfolio-main/public"
    img_paths = [
        os.path.join(base_dir, "doctor-on-call-new-first.png"),
        os.path.join(base_dir, "doctor-on-call-2.png"),
        os.path.join(base_dir, "doctor-on-call-3.png"),
        os.path.join(base_dir, "doctor-on-call-1.png")
    ]
    
    images = [Image.open(x).convert('RGB') for x in img_paths]
    widths, heights = zip(*(i.size for i in images))

    target_width = max(widths)
    
    resized_images = []
    for im in images:
        if im.width != target_width:
            aspect_ratio = im.height / im.width
            new_height = int(target_width * aspect_ratio)
            resized_im = im.resize((target_width, new_height), Image.Resampling.LANCZOS)
            resized_images.append(resized_im)
        else:
            resized_images.append(im)

    total_width = target_width
    max_height = sum(im.height for im in resized_images)

    new_im = Image.new('RGB', (total_width, max_height), color=(255, 255, 255))

    y_offset = 0
    for im in resized_images:
        new_im.paste(im, (0, y_offset))
        y_offset += im.height

    output_path = os.path.join(base_dir, "doctor-on-call-full.png")
    new_im.save(output_path)
    print(f"Saved stitched image to {output_path}")

if __name__ == '__main__':
    stitch_images()
