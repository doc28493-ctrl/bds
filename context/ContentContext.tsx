import React, { createContext, useContext, useState, useEffect } from 'react';

// Default Content
const defaultContent = {
  intro: {
    image: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/10/benner-vinhomes-green-paradise.png",
    title: "VỊNH XANH PHỒN VINH", 
    subtitle: "Kiệt tác nghỉ dưỡng giữa lòng thiên nhiên",
    buttonText: "Khám Phá Ngay"
  },
  hero: {
    label: "VINHOMES GREEN PARADISE",
    title1: "SIÊU ĐÔ THỊ BIỂN ESG++",
    title2: "Tâm điểm Vui chơi - giải trí - nghỉ dưỡng",
    desc: "Nơi hội tụ tinh hoa đất trời, kiến tạo chuẩn mực sống thượng lưu mới tại Việt Nam.", 
    bgImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2874&auto=format&fit=crop",
    // CHANGED: New Waterfall/Stream video as requested (Fix complete)
    videoUrl: "https://cdn.pixabay.com/video/2024/06/10/216134_small.mp4",
    stats_number: "2,870",
    stats_label: "Hecta Quy Mô"
  },
  popup: {
    title: "TẢI TRỌN BỘ TÀI LIỆU DỰ ÁN",
    subtitle: "Bảng giá gốc & Chính sách ưu đãi mới nhất tháng 10/2025",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Tải Ngay (Miễn Phí)"
  },
  overview: {
    heading: "Không chỉ là nơi ở, đó là Di Sản của tương lai.",
    image: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/10/benner-vinhomes-green-paradise.png",
    item1_title: "Siêu Đô Thị Lấn Biển",
    item1_desc: "Quy mô 2,870 ha – lớn nhất Việt Nam. Một kiệt tác quy hoạch nằm giữa vùng đệm sinh quyển thế giới.",
    item2_title: "Tiên Phong ESG++",
    item2_desc: "Đô thị đầu tiên áp dụng tiêu chuẩn kép về Môi trường (Environment), Xã hội (Social) và Quản trị (Governance).",
    item3_title: "Kỳ Quan Kiến Trúc",
    item3_desc: "Sở hữu tháp 108 tầng trong Top 10 thế giới, nhà hát Opera bên biển và sân Golf đẳng cấp quốc tế."
  },
  masterplan: {
    heading: "MẶT BẰNG TỔNG THỂ",
    subheading: "QUY HOẠCH ĐỈNH CAO",
    desc: "Khu đô thị lấn biển Vinhomes Green Paradise Cần Giờ được chia thành 5 phân khu chức năng với quy mô dân số khoảng 500.000 người và mục tiêu đón hơn 12 triệu lượt khách mỗi năm.",
    image_main: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/09/mat-bang-quy-hoach-vinhomes-green-paradise-can-gio.jpg",
    image_sub: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/09/mat-bang-vinhomes-green-paradise-can-gio.jpg"
  },
  zones: [
    {
      id: "zone1",
      name: "THE HAVEN BAY",
      subtitle: "Vịnh Tiên - 950ha",
      desc: "Phân khu đô thị sinh thái kết hợp dịch vụ du lịch, cửa ngõ vào khu đô thị. Điểm nhấn là sự kết hợp giữa không gian sinh thái và các khu nghỉ dưỡng, sân golf, bãi tắm công cộng.",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2864&auto=format&fit=crop"
    },
    {
      id: "zone2",
      name: "THE GREEN BAY",
      subtitle: "Vịnh Ngọc - 660ha",
      desc: "Khu vực phát triển du lịch nghỉ dưỡng và nhà ở, kết hợp y tế, giáo dục. Không gian kiến trúc được tổ chức theo các trục cảnh quan chính và phố đi bộ ven biển.",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: "zone3",
      name: "THE PARADISE",
      subtitle: "Mũi Danh Vọng",
      desc: "Trung tâm tài chính, kinh tế và thương mại dịch vụ. Nơi tập trung các công trình điểm nhấn như tháp biểu tượng 108 tầng tại mũi Hải Đăng.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: "zone4",
      name: "THE GRAND ISLAND",
      subtitle: "Đảo Mặt Trời",
      desc: "Khu vực phát triển thương mại và nghỉ dưỡng cao cấp. Tập trung vào các khu resort, khách sạn, trung tâm thương mại và giải trí ven mặt nước.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: "zone5",
      name: "BLUE LAGOON",
      subtitle: "Phân khu Trung tâm",
      desc: "Khu vực mặt nước, kênh dẫn và cây xanh, đóng vai trò điều hòa không khí và tạo cảnh quan sinh thái bền vững cho toàn khu đô thị.",
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2940&auto=format&fit=crop"
    },
  ],
  zones_intro: {
      heading: "5 PHÂN KHU BIỂU TƯỢNG",
      desc: "Tháng 02/2021, UBND TP Hồ Chí Minh đã ban hành quyết định phê duyệt quy hoạch chi tiết 1/5000 khu đô thị du lịch lấn biển Cần Giờ với 5 phân khu tổng diện tích hơn 2.870ha.",
      map_image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2844&auto=format&fit=crop"
  },
  reasons: {
      heading: "6 GIÁ TRỊ VÀNG ĐỘC TÔN",
      r1_title: "Vị Trí Kim Cương",
      r1_desc: "Cửa ngõ giao thương quốc tế, kết nối trực tiếp trung tâm TP.HCM và vùng kinh tế trọng điểm phía Nam.",
      r2_title: "Chủ Đầu Tư Uy Tín",
      r2_desc: "Vinhomes - Thương hiệu BĐS số 1 Việt Nam, bảo chứng cho tiến độ, chất lượng và tiềm năng tăng giá.",
      r3_title: "Quy Mô Kỷ Lục",
      r3_desc: "Siêu dự án lấn biển 2.870ha lớn nhất Việt Nam, quần thể tiện ích 'All-in-one' chưa từng có.",
      r4_title: "Pháp Lý Minh Bạch",
      r4_desc: "Dự án nằm trong quy hoạch chiến lược quốc gia, pháp lý hoàn chỉnh, sở hữu lâu dài.",
      r5_title: "Tiềm Năng Tăng Giá",
      r5_desc: "Đón sóng hạ tầng Cầu Cần Giờ & Cảng trung chuyển quốc tế. Cơ hội X2, X3 tài sản.",
      r6_title: "Di Sản Truyền Đời",
      r6_desc: "BĐS hàng hiệu phiên bản giới hạn, khẳng định vị thế chủ nhân tinh hoa."
  },
  location: {
    heading: "VỊ TRÍ ĐỘC TÔN",
    subheading: "GIAO ĐIỂM VÀNG CỦA RỪNG VÀ BIỂN",
    desc: "KĐT Vinhomes Green Paradise sở hữu vị trí độc tôn của TP.HCM, án ngữ tại xã Long Hòa và thị trấn Cần Thạnh thuộc huyện Cần Giờ. Là huyện ngoại thành ven biển duy nhất của thành phố.",
    boundary_north: "Phía Bắc giáp một phần hành lang cây xanh cảnh quan đường dọc Biển Đông 1, Biển Đông 2.",
    boundary_south: "Phía Nam giáp biển Đông.",
    boundary_east: "Phía Đông giáp biển Đông (Vịnh Gành Rái).",
    boundary_west: "Phía Tây giáp biển Đông (cửa sông Đồng Tranh).",
    image_map: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/10/ban-do-map-vi-tri-vinhomes-green-paradise-can-gio.jpg",
    
    fengshui_heading: "BẢN NHẠC GIAO HƯỞNG RỪNG & BIỂN",
    fengshui_desc: "Khu đô thị tựa như một “bản nhạc giao hưởng” đầy đủ âm sắc. “Lưng tựa Sơn mặt hướng biển” tạo nên một vị thế vững chắc trường tồn mang đến phong thủy cho những chủ nhân tương lai.",
    image_fengshui: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop", 
    
    dist_1: "Cách cảng Tân Cảng: 110km",
    dist_2: "Cách đảo Cần Giờ: 4km",
    dist_3: "Cách chợ Bến Thành: 55km",
    dist_4: "Cách Vũng Tàu: 130km",
    
    infra_map_image: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/10/ban-do-map-vi-tri-vinhomes-green-paradise-can-gio.jpg",
    
    infra_bridge_title: "CẦU CẦN GIỜ",
    infra_bridge_desc: "Dài 3.4 km, 4 làn xe. Đòn bẩy hạ tầng giúp kết nối khu Nam TP HCM với dự án Vinhomes Cần Giờ.",
    infra_bridge_image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2000&auto=format&fit=crop", 
    
    infra_rail_title: "ĐƯỜNG SẮT CAO TỐC",
    infra_rail_desc: "Tuyến đường sắt Phú Mỹ Hưng – Cần Giờ dài 48.5km, tốc độ 350km/h. Di chuyển từ TP.HCM đến dự án chỉ tốn 12 phút.",
    infra_rail_image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000&auto=format&fit=crop"
  },
  amenities: {
    heading: "SIÊU ĐIỂM NHẤN ĐÔ THỊ",
    desc: "Vinhomes Green Paradise – Siêu đô Thị ESG++ xanh – thông minh – sinh thái & tái sinh hàng đầu thế giới.",
    
    // LANDMARKS
    landmark_tower_title: "Tháp 108 Tầng",
    landmark_tower_sub: "Top 10 Thế Giới",
    landmark_tower_desc: "Công trình kỳ quan ESG++ mới của toàn cầu, tích hợp trung tâm thương mại, văn phòng cao cấp & khách sạn siêu sang.",
    landmark_tower_img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",

    landmark_theatre_title: "Blue Wave Theatre",
    landmark_theatre_sub: "Nhà Hát Sóng Xanh 7ha",
    landmark_theatre_desc: "Kiến trúc độc đáo bậc nhất thế giới, sức chứa 5.000 chỗ, tư vấn bởi Gensler. Nơi diễn ra các sự kiện nghệ thuật quốc tế.",
    landmark_theatre_img: "https://images.unsplash.com/photo-1522069394066-326005dc26b2?q=80&w=2000&auto=format&fit=crop",

    // ENTERTAINMENT
    ent_lagoon_title: "Paradise Lagoon",
    ent_lagoon_sub: "Biển Hồ 433ha Lớn Nhất Thế Giới",
    ent_lagoon_desc: "Sử dụng nước biển tự nhiên, lọc trực tiếp từ biển Cần Giờ. Tận hưởng làn nước xanh mát 365 ngày ngay trước hiên nhà.",
    ent_lagoon_img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000&auto=format&fit=crop",

    ent_park_title: "Theme Park 122ha",
    ent_park_sub: "Quần Thể Vui Chơi Giải Trí",
    ent_park_desc: "Gồm Công viên nước Hybrid, Safari, Winter Wonderland (30.000m2), Đường tàu lượn Motor siêu tốc.",
    ent_park_img: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=2000&auto=format&fit=crop",

    // ELITE
    elite_golf_title: "Sân Golf 18 Lỗ",
    elite_golf_sub: "Thiết Kế Bởi Tiger Woods",
    elite_golf_desc: "Đẳng cấp số 1 thế giới. Trải nghiệm golf giữa địa hình đa dạng của rừng và biển, đón bình minh & hoàng hôn.",
    elite_golf_img: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2000&auto=format&fit=crop",

    elite_marina_title: "Landmark Harbour",
    elite_marina_sub: "Cảng Tàu Quốc Tế 5 Sao",
    elite_marina_desc: "Nơi đón các siêu du thuyền sang trọng của giới thượng lưu siêu giàu và tàu du lịch danh tiếng thế giới.",
    elite_marina_img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2000&auto=format&fit=crop",

    elite_hospital_title: "Tổ Hợp Y Tế & Nghỉ Dưỡng",
    elite_hospital_sub: "Vinmec & Cleveland Clinic (Mỹ)",
    elite_hospital_desc: "Hệ thống y tế số 1 nước Mỹ hợp tác cùng Vinmec. Kết hợp tổ hợp khách sạn ~7000 phòng với 20 thương hiệu toàn cầu.",
    elite_hospital_img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop",
    
    // MAPS
    map_1: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/09/so-do-mat-bang-tien-ich-vinhomes-green-paradise.jpg",
    map_2: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/05/cum-tien-ich-van-hoa-nghe-thuat-tai-vinhomes-green-paradise-can-gio.jpg",
    map_3: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/05/cum-tien-ich-theo-thao-du-lich-tai-vinhomes-green-paradise-can-gio.jpg",
    map_4: "https://vinhomesgreenparadises.vn/wp-content/uploads/2025/05/cum-tien-ich-vui-choi-giai-tri-kinh-te-doi-song-tai-vinhomes-green-paradise-can-gio.jpg"
  },
  videoGallery: {
    heading: "THƯ VIỆN VIDEO",
    desc: "Chiêm ngưỡng vẻ đẹp siêu thực của Vịnh Xanh qua những thước phim sống động.",
    video1_url: "https://youtu.be/p2Bfy_jwzPs?si=VOdnqy2xNXP3l82G",
    video2_url: "https://youtu.be/QtY39yEuVl4?si=ATk4hq2jO99QvdKH"
  },
  gallery: [
    {
        title: "The Grand Island",
        category: "Phân khu VIP",
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop",
        colSpan: "md:col-span-2 lg:col-span-2 row-span-2"
    },
    {
        title: "The Haven Bay",
        category: "Biệt thự Biển",
        src: "https://images.unsplash.com/photo-1600596542815-e328d4de4bf7?q=80&w=2940&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Penthouse View",
        category: "Nội Thất",
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "The Paradise",
        category: "Dinh Thự",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2900&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Sky Lounge",
        category: "Tiện Ích",
        src: "https://images.unsplash.com/photo-1522771753035-10a137d60cae?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Biệt Thự Đảo",
        category: "Nghỉ Dưỡng",
        src: "https://images.unsplash.com/photo-1572331165267-854da2b00dc1?q=80&w=2940&auto=format&fit=crop",
        colSpan: "lg:row-span-2"
    },
    {
        title: "Green Walkway",
        category: "Cảnh Quan",
        src: "https://images.unsplash.com/photo-1507703819830-1c312788c031?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Khu Phố Thương Mại",
        category: "Mua Sắm",
        src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2940&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "City By Night",
        category: "Toàn Cảnh",
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop",
        colSpan: "md:col-span-2"
    },
    {
        title: "Royal Pool Club",
        category: "Giải Trí",
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Quảng Trường Ánh Sáng",
        category: "Lễ Hội",
        src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Private Golf Villa",
        category: "Đặc Quyền",
        src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Bến Du Thuyền VIP",
        category: "Thượng Lưu",
        src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2940&auto=format&fit=crop",
        colSpan: ""
    },
    {
        title: "Wellness Spa",
        category: "Sức Khỏe",
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop",
        colSpan: ""
    }
  ],
  contact: {
    hotline: "0909.18.86.18",
    email: "info@vinhomesgreenparadise.vn",
    address: "Cần Giờ, TP. Hồ Chí Minh",
    policy_heading: "Chính Sách Ưu Đãi Tháng 10/2025",
    policy_1: "Tặng gói nội thất cao cấp trị giá 500 triệu đồng.",
    policy_2: "Hỗ trợ lãi suất 0% trong 24 tháng.",
    policy_3: "Chiết khấu 10% cho khách hàng thanh toán sớm."
  },
  // Fixed deployment URL
  config: {
      googleSheetUrl: "https://script.google.com/macros/s/AKfycbwP96pv0aLvy3aSD4K4WkABieEdRNAVeZoNPaVLA8zwmBOXOXCjPNLZWm-6FuGc6js/exec",
      leadSheetUrl: "" // Separate Sheet for leads
  }
};

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateContent: (newContent: ContentType) => void;
  resetContent: () => void;
  publishContent: (contentToPublish: ContentType) => Promise<boolean>;
  submitLead: (data: any) => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultContent);

  useEffect(() => {
    // 1. Load local content first (fastest)
    const savedContent = localStorage.getItem('site_content');
    let localData = defaultContent;
    
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // FIX: Deep merge hero to preserve new keys (videoUrl) if missing in saved data
        localData = { ...defaultContent, ...parsed };
        
        if (parsed.hero) {
            localData.hero = { ...defaultContent.hero, ...parsed.hero };
            
            // AUTOMATIC FIX FOR OLD VIDEO URL
            // List of known old videos to replace
            const oldVideos = [
                "https://cdn.pixabay.com/video/2022/05/13/116905-709774653_large.mp4",
                "https://cdn.pixabay.com/video/2020/05/25/40149-426567540_large.mp4",
                "" // Replace empty strings too
            ];
            
            // If current stored video matches an old one, or is missing, force the new default
            if (!localData.hero.videoUrl || oldVideos.includes(localData.hero.videoUrl)) {
                console.log("Migrating to new video URL...");
                localData.hero.videoUrl = defaultContent.hero.videoUrl;
            }
        }
        
        // Force correct URL if it's missing or empty in the saved data
        if (!localData.config?.googleSheetUrl) {
             localData.config = { ...localData.config, googleSheetUrl: defaultContent.config.googleSheetUrl };
        }
        
        setContent(localData);
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }

    // 2. If Google Sheet URL exists, try to fetch fresh data (Real-time sync)
    if (localData.config.googleSheetUrl) {
        // Prevent caching by appending timestamp
        const separator = localData.config.googleSheetUrl.includes('?') ? '&' : '?';
        const fetchUrl = `${localData.config.googleSheetUrl}${separator}t=${Date.now()}`;
        
        fetch(fetchUrl)
            .then(res => res.json())
            .then(cloudData => {
                if (cloudData && typeof cloudData === 'object' && Object.keys(cloudData).length > 0) {
                    console.log("Synced content from Google Sheets");
                    
                    const merged = { 
                        ...localData, 
                        ...cloudData, 
                        // FIX: Deep merge hero here too to ensure cloud data doesn't wipe out videoUrl if cloud is old
                        hero: { ...localData.hero, ...cloudData.hero },
                        config: { 
                            googleSheetUrl: localData.config.googleSheetUrl,
                            leadSheetUrl: cloudData.config?.leadSheetUrl || localData.config.leadSheetUrl
                        }
                    };

                    // Ensure videoUrl exists after cloud merge and check again for old videos
                     const oldVideos = [
                        "https://cdn.pixabay.com/video/2022/05/13/116905-709774653_large.mp4",
                        "https://cdn.pixabay.com/video/2020/05/25/40149-426567540_large.mp4",
                        ""
                    ];
                    if (!merged.hero.videoUrl || oldVideos.includes(merged.hero.videoUrl)) {
                         merged.hero.videoUrl = defaultContent.hero.videoUrl;
                    }
                    
                    setContent(merged);
                    // Update local storage to keep it fresh
                    localStorage.setItem('site_content', JSON.stringify(merged));
                }
            })
            .catch(err => console.warn("Sync failed or offline:", err));
    }
  }, []);

  const updateContent = (newContent: ContentType) => {
    setContent(newContent);
    localStorage.setItem('site_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    const resetData = { ...defaultContent, config: content.config }; // Keep config
    setContent(resetData);
    localStorage.setItem('site_content', JSON.stringify(resetData));
  };

  const publishContent = async (contentToPublish: ContentType): Promise<boolean> => {
      const targetUrl = contentToPublish.config.googleSheetUrl;
      
      if (!targetUrl) {
          alert("Vui lòng cấu hình Google Sheet URL trước khi xuất bản!");
          return false;
      }
      
      try {
          // Construct URL with timestamp to bypass caching
          const separator = targetUrl.includes('?') ? '&' : '?';
          const urlWithParams = `${targetUrl}${separator}t=${Date.now()}`;

          // Use FormData for robust transmission
          const formData = new FormData();
          formData.append('action', 'saveConfig');
          
          // CRITICAL: Stringify the entire content object so Apps Script can just save it to a cell
          formData.append('data', JSON.stringify(contentToPublish));

          console.log("Publishing to:", urlWithParams);

          // Fire and forget approach for robustness with GAS
          await fetch(urlWithParams, {
              method: 'POST',
              mode: 'no-cors', 
              credentials: 'omit',
              body: formData
          });
          
          return true;
      } catch (error) {
          console.error("Publish error:", error);
          return false;
      }
  };

  const submitLead = async (data: any): Promise<boolean> => {
      // PRIORITY: Use Separate Lead Sheet if available, else fall back to Main Sheet
      const targetUrl = content.config.leadSheetUrl || content.config.googleSheetUrl;
      
      if (!targetUrl) {
          console.warn("No Google Sheet URL configured. Lead not saved to cloud.");
          return true; // Pretend success for UI
      }

      try {
        // Construct form data
        const formData = new FormData();
        // If we are sending to the dedicated lead sheet, the script handles doPost directly
        // If we are sending to the combined sheet, we need 'action=contact'
        // For safety, we always append action, but dedicated sheet might ignore it.
        formData.append('action', 'contact'); 
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('interest', data.interest);

        const separator = targetUrl.includes('?') ? '&' : '?';
        const urlWithAction = `${targetUrl}${separator}action=contact`;

        await fetch(urlWithAction, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'omit', 
            body: formData
        });
        return true;
      } catch (error) {
          console.error("Lead submission error:", error);
          return false;
      }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, publishContent, submitLead }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
