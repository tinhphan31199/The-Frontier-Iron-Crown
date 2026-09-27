# Hướng dẫn tạo Prompt Ảnh Webtoon Hàn Quốc

## Mục tiêu

Mọi ảnh tạo ra phải giống một **khung truyện trong webtoon Hàn Quốc**.
Hoàn toàn là **tranh minh họa 2D**.
Không có bất kỳ yếu tố 3D, CGI, hay hiện thực nào.

---

## Định dạng ảnh

| Yếu tố | Giá trị |
|--------|---------|
| **Tỷ lệ** | 3:4 (portrait) — chuẩn webtoon dọc |
| **Kích thước** | `864 x 1152` px |
| **Model** | `fal-ai/flux/schnell` |

---

## Phong cách vẽ (bắt buộc trong mọi prompt)

```
Korean webtoon style
2D anime illustration
clean line art
thin black outline
flat anime coloring
soft cel shading
comic panel composition
graphic novel illustration
```

---

## Chất lượng (bắt buộc trong mọi prompt)

```
masterpiece
best quality
highly detailed
sharp focus
professional coloring
```

---

## Cấu trúc prompt

Prompt phải có đủ các phần sau, viết liền thành một đoạn văn:

### 1. Nhân vật
```
[character name], [age/appearance], [pose/action], [expression],
[outfit details], [accessories]
```

### 2. Bối cảnh
```
[location], [time of day], [weather], [environment details],
[architecture/style], [props]
```

### 3. Góc máy & bố cục
```
[camera shot type], [camera angle], [composition],
[focal point], [depth]
```

### 4. Ánh sáng
```
[light source], [light type], [atmosphere],
[color tone], [contrast]
```

### 5. Style & quality keywords
Tự động được thêm bởi code.

---

## Negative prompt (mặc định)

Mặc định đã có trong code. Chỉ ghi đè khi cần thêm từ cấm đặc thù.

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

## Các từ KHÔNG BAO GIỜ được dùng trong prompt

Những từ này sẽ khiến AI tạo ảnh có yếu tố 3D hoặc hiện thực:

| Từ cấm | Lý do |
|--------|-------|
| `photorealistic` | Tạo ảnh giống ảnh chụp |
| `hyper realistic` | Tạo ảnh siêu thực — sai style |
| `semi realistic` | Nửa thực — phá vỡ đồng nhất webtoon |
| `3D` | Tạo ảnh 3D — không phải 2D |
| `CGI` | Tạo ảnh CGI — không phải tranh vẽ |
| `octane render` | Render 3D chuyên nghiệp |
| `unreal engine` | Render từ game engine |
| `ray tracing` | Kỹ thuật render 3D |
| `DSLR` | Tạo hiệu ứng ảnh chụp từ máy |
| `camera` | Tạo hiệu ứng ống kính |
| `film grain` | Tạo hiệu ứng phim |
| `oil painting` | Tạo hiệu ứng sơn dầu — sai phong cách |
| `watercolor` | Tạo hiệu ứng màu nước |
| `sketch` | Tạo nét phác thảo — không sạch |
| `Pixar` | Tạo ảnh giống Pixar — 3D CGI |
| `skin pores` | Tạo da có lỗ chân lông — hiện thực |
| `real hair` | Tạo tóc thật — sai style anime |
| `real eyelashes` | Tạo lông mi thật |
| `plastic skin` | Tạo da bóng nhựa — 3D |
| `neon colors` | Tạo màu neon — sai bảng màu webtoon |
| `oversaturated` | Tạo màu quá bão hòa |

---

## Các từ NÊN dùng trong prompt

### Phong cách
```
Korean webtoon, manhwa style, 2D anime,
web comic panel, digital illustration
```

### Kỹ thuật vẽ
```
clean line art, thin outline, flat coloring,
cel shading, soft shading, solid colors,
comic inking, stylized illustration
```

### Chất lượng
```
masterpiece, best quality, highly detailed,
sharp focus, professional coloring,
dynamic composition, beautiful lighting
```

### Đặc tả webtoon
```
comic panel composition, graphic novel style,
screen tone, halftone texture,
panel framing, comic book art
```

---

## Ví dụ prompt hoàn chỉnh

### Prompt gốc (scene description)
```
Louis, sitting at desk in high-rise office on 47th floor, 3 AM,
back view, shoulders slumped with exhaustion, white dress shirt
with rolled sleeves, suit jacket on chair, one hand on keyboard
one hand holding coffee, four monitors displaying financial charts,
dark rainy window on left, water streaks on glass, cold blue-white
monitor light, warm amber desk lamp, large shadow cast on wall,
medium shot from doorway, lonely atmosphere, empty office floor
```

### Prompt gửi lên API (sau khi code thêm style + quality)
```
Louis, sitting at desk in high-rise office on 47th floor, 3 AM,
back view, shoulders slumped with exhaustion, white dress shirt
with rolled sleeves, suit jacket on chair, one hand on keyboard
one hand holding coffee, four monitors displaying financial charts,
dark rainy window on left, water streaks on glass, cold blue-white
monitor light, warm amber desk lamp, large shadow cast on wall,
medium shot from doorway, lonely atmosphere, empty office floor,
Korean webtoon style, 2D anime illustration, clean line art,
thin black outline, flat anime coloring, soft cel shading,
masterpiece, best quality, highly detailed, sharp focus,
professional coloring
```

---

## Checklist kiểm tra trước khi gen

- [ ] Prompt có đủ **nhân vật** (tên, tư thế, trang phục, biểu cảm)?
- [ ] Prompt có đủ **bối cảnh** (địa điểm, thời gian, thời tiết)?
- [ ] Prompt có đủ **góc máy & bố cục**?
- [ ] Prompt có đủ **ánh sáng**?
- [ ] Prompt KHÔNG chứa từ cấm (3D, realistic, render, ...)?
- [ ] Size đúng `864x1152` (3:4 portrait)?
- [ ] Seed nên giữ nếu muốn tái tạo ảnh cũ?
