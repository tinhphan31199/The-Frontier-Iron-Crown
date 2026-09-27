Trong **Dark Fantasy**, không có một màu nền duy nhất, nhưng các studio game (Dark Souls, Elden Ring, Diablo, Berserk, The Witcher...) và các manhwa như *Doom Breaker*, *Latna Saga*, *Revenge of the Iron-Blooded Sword Hound* thường dùng cùng một bảng màu.

## Bảng màu chủ đạo (Dark Fantasy Palette)

| Màu       | Hex       | Công dụng                    |
| --------- | --------- | ---------------------------- |
| Than đen  | `#1A1A1A` | Bóng tối, lâu đài, hang động |
| Xám than  | `#2B2B2B` | Tường đá, mây giông          |
| Xám lạnh  | `#4B4F56` | Mưa, sương mù                |
| Xanh xám  | `#3E4C59` | Bầu trời u ám                |
| Xanh navy | `#1F2A44` | Ban đêm, áo choàng           |
| Nâu gỗ    | `#5B4636` | Gỗ, nhà cổ                   |
| Nâu đất   | `#6D5843` | Đường đất                    |
| Đỏ sẫm    | `#6B1E1E` | Máu, chiến tranh             |
| Đỏ rượu   | `#8B2F2F` | Áo choàng, cờ                |
| Vàng cổ   | `#C8A45A` | Ánh đuốc, kim loại           |
| Đồng cũ   | `#8C6A43` | Giáp, vũ khí                 |
| Trắng xám | `#E5E5E5` | Sương, ánh trăng             |
| Trắng tái | `#F2EDE8` | Da nhân vật chính            |
| Hồng nhạt | `#E8C4B8` | Má, mũi Louis (tự nhiên)     |
| Xanh mắt  | `#A4B6C6` | Mống mắt Louis               |

---

## Bầu trời

Dark Fantasy hiếm khi dùng màu xanh trong.

Thường là:

* Xám chì
* Xanh xám
* Đen
* Mây dày

Ví dụ:

```text
#2D3138
#3A4048
#444950
```

---

## Ánh sáng

Nguồn sáng thường chỉ có:

* Đuốc
* Nến
* Trăng
* Phép thuật

Màu:

```text
Amber

Warm Orange

Golden

Soft Yellow
```

Ví dụ:

```text
#D8A24A
#E6C068
#F2D88A
```

---

## Phép thuật

Dark Fantasy thường dùng:

### Ma thuật đen

```text
Tím đậm

Đen tím

Xanh tím
```

```text
#4A2A66
#59338B
#6C52A8
```

---

### Ma thuật ánh sáng

```text
Vàng

Trắng

Xanh Cyan
```

---

## Rừng

Không dùng xanh lá tươi.

Thường:

```text
Olive

Dark Green

Gray Green
```

Ví dụ

```text
#46503D
#556B4A
#374337
```

---

## Thành phố

Thường:

* Đá xám
* Gỗ nâu
* Mái xanh đen

---

## Da nhân vật

Dark Fantasy thường tránh da trắng hồng kiểu anime cho các nhân vật nền.
Nhưng **nhân vật chính có một ngoại lệ có chủ đích**: da trắng tái, có chút hồng tự nhiên — gợi dòng máu quý tộc hoặc xuất thân đặc biệt, tương phản với môi trường tối tăm xung quanh.

### Quy tắc phối màu da

| Loại nhân vật | Da | Ghi chú |
|---|---|---|
| **Nhân vật chính (Louis)** | Trắng tái, hồng nhẹ ở gò má và mũi | Hồng hào thiếu niên — khỏe mạnh, chưa từng lao động. Gương mặt nổi bật trên nền tối |
| **Quý tộc / tri thức** | Trắng bệch, thiếu sáng — không hồng | Da người sống trong lâu đài / phòng làm việc |
| **Nông dân / lao động** | Ngăm — nâu đất — xỉn | Da cháy nắng, nhám, nhiều nếp nhăn — bụi bám |
| **Tị nạn / tù khổ sai** | Nâu đất, bẩn — tái vì đói | Màu da pha tạp với bụi và vết thương |
| **Binh lính** | Rám nắng — ngăm, có sẹo | Da dày, sần, có vết cháy nắng |

### Cách phối để nhân vật chính nổi bật

Da của Louis (trắng hồng) sẽ **nổi bật trên mọi nền tối**:
- Nền xám / đá / bóng tối → da trắng + mắt xanh xám = trung tâm thị giác
- Nền ngăm (tị nạn xung quanh) → tương phản mạnh — gợi sự khác biệt về xuất thân
- Nền tối chiến đấu → rim light vàng trên da trắng tạo hiệu ứng hào quang

⚠️ **Không dùng da trắng hồng cho nhân vật phụ — chỉ Louis có đặc quyền này.**

---

# Prompt

Có thể viết:

```text
Dark fantasy color palette,
desaturated colors,
cold atmosphere,
dark medieval kingdom,
charcoal gray sky,
deep blue shadows,
weathered stone,
aged wood,
warm torch lighting,
cinematic contrast,
volumetric fog,
moody environment,
high dynamic range.
```

---

# Độ Saturation

Đây là điểm nhiều AI vẽ sai.

Dark Fantasy thường:

```
Saturation:

35~60%
```

không phải

```
100%
```

---

# Độ sáng

```
Brightness:

25~45%
```

---

# Nếu muốn giống Manhwa Hàn

Các manhwa fantasy Hàn thường **không tối toàn bộ khung hình**. Họ áp dụng nguyên tắc:

* **Nền:** tông tối, lạnh, ít bão hòa (xám, xanh than, nâu cũ).
* **Nhân vật chính:** sáng hơn nền khoảng 20–30% để nổi bật.
* **Điểm nhấn:** dùng ánh sáng vàng từ đuốc, phép thuật hoặc mặt trời xuyên qua mây để tạo tương phản.

Cách phối này giữ được không khí u ám của Dark Fantasy nhưng vẫn giúp nhân vật nổi bật và dễ đọc trong từng khung truyện.
