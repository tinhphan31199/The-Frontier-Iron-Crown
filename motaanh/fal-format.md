# FAL Image Generation Format

File này định nghĩa tham số cố định cho mọi lần gọi API FAL.
KHÔNG thay đổi trừ khi có lý do chính đáng.

---

## Model

```
fal-ai/flux/schnell
```

Lý do: Nhanh, chi phí thấp, chất lượng ổn định cho webtoon.

---

## Image Size (Webtoon Portrait 3:4)

Mặc định:

```
{ width: 864, height: 1152 }
```

Tỷ lệ thay thế (tuỳ cảnh):

| Loại cảnh         | Size (object)                | Aspect Ratio |
| ----------------- | ---------------------------- | ------------ |
| Cận mặt / chân dung | `{ width: 768, height: 1024 }` | 3:4        |
| Bán thân / hội thoại | `{ width: 864, height: 1152 }` | 3:4        |
| Toàn cảnh / battle  | `{ width: 1152, height: 864 }` | 4:3        |
| Dọc webtoon panel | `{ width: 864, height: 1152 }` | 3:4        |

Luôn dùng `{ width: 864, height: 1152 }` (3:4) nếu không có chỉ định khác.

> **Lưu ý:** Flux Schnell không nhận string `"864x1152"`. Phải dùng object `{ width, height }` hoặc preset string như `"portrait_4_3"`, `"square_hd"`.

---

## Inference Steps

```
num_inference_steps: 4
```

Flux Schnell chỉ cần 4 bước. Không tăng.

---

## Guidance Scale

```
guidance_scale: 3.5
```

---

## Safety Checker

```
enable_safety_checker: false
```

---

## Seed

Bỏ trống (ngẫu nhiên) hoặc dùng seed cũ nếu muốn tái tạo ảnh.

---

## Prompt Template

Prompt phải luôn có cấu trúc sau:

```
[subject], [pose/action], [outfit], [expression],
[environment/background], [camera angle], [lighting],
[style keywords], [quality keywords]
```

### Style keywords (bắt buộc)

Những keyword này phải có trong mọi prompt:

```
Korean webtoon style,
2D anime illustration,
clean line art,
thin black outline,
flat anime coloring,
soft cel shading,
comic panel composition,
graphic novel illustration
```

### Dark Fantasy keywords (nếu cảnh thuộc dark fantasy)

```
dark fantasy color palette,
desaturated colors,
cold atmosphere,
charcoal gray sky,
moody environment,
volumetric fog,
warm torch lighting,
cinematic contrast,
high dynamic range
```

### Quality keywords (bắt buộc)

```
masterpiece,
best quality,
highly detailed,
sharp focus,
professional coloring
```

### Negative prompt (bắt buộc)

Những từ này phải có trong negative prompt của mọi lần gen:

```
photorealistic, hyper realistic, semi realistic,
3D, CGI, octane render, unreal engine, ray tracing,
photography, DSLR, camera, lens, film,
oil painting, watercolor, sketch, Pixar,
western comic, low quality, blur,
extra fingers, bad anatomy, duplicate character,
watermark, logo, signature, text,
skin pores, real hair, real eyelashes,
plastic skin, neon colors, oversaturated
```

---

## Ví dụ Prompt hoàn chỉnh

### Prompt

```
Louis, standing in torch-lit castle corridor, black noble coat,
determined expression, medieval gothic architecture,
stone walls, low angle shot, volumetric lighting,
Korean webtoon style, 2D anime illustration,
clean line art, thin black outline, flat anime coloring,
soft cel shading, dark fantasy color palette,
desaturated colors, cinematic contrast,
masterpiece, best quality, highly detailed, sharp focus
```

### Negative prompt

```
photorealistic, hyper realistic, semi realistic,
3D, CGI, octane render, unreal engine, ray tracing,
photography, DSLR, camera lens, film grain,
oil painting, watercolor, sketch, Pixar style,
western comic, low quality, blurry,
extra fingers, bad anatomy, duplicate character,
watermark, logo, signature, text,
skin pores, real hair, real eyelashes,
plastic skin, neon colors, oversaturated
```

---

## Kiểm tra trước khi gen

1. ✍️ **Viết scene description** — mô tả nhân vật, hành động, trang phục, biểu cảm, môi trường, góc máy, ánh sáng
2. ✅ **Style + Quality keywords** — đã được auto-append bởi `buildPrompt()` — không cần viết tay
3. ✅ **Negative prompt** — đã có sẵn default — chỉ cần ghi đè nếu cần
4. ✅ **Size** — mặc định `864x1152` (3:4 portrait) — dùng `--size` nếu muốn đổi
5. ✅ **Model** — `fal-ai/flux/schnell` — mặc định
6. 🤔 **Seed** — bỏ trống = ngẫu nhiên, dùng `--seed <n>` để tái tạo ảnh cũ
7. 📁 **Auto file** — có thể truyền đường dẫn `.md` thay vì gõ prompt tay
