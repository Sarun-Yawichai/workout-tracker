# Workout Tracker

แอพบันทึกผลการออกกำลังกาย แบ่งประเภทการออกกำลังกายรายวัน พร้อม dashboard สรุปภาพรวม

🔗 **Live Demo:** [https://workout-tracker-xi-cyan.vercel.app/](https://workout-tracker-xi-cyan.vercel.app/)

> หมายเหตุ: ตัว demo รัน SQLite บน `/tmp` ของ Vercel serverless ข้อมูลอาจ
> รีเซ็ตเมื่อมี cold start หรือ deploy ใหม่ — เป็นพฤติกรรมที่ตั้งใจไว้สำหรับ
> demo ไม่ใช่บั๊ก

## Features

- บันทึกผลออกกำลังกายผ่าน popup form (วันที่, ประเภท, ระยะเวลา, แคลอรี่, โน้ต)
- แก้ไข/ลบรายการที่บันทึกไว้ได้ พร้อม popup ยืนยันก่อนลบ
- Dashboard สรุปนาทีออกกำลังกายต่อวัน (7 วันล่าสุด) และสัดส่วนประเภทการออกกำลังกาย
- แจ้งเตือนเมื่อบันทึก/ลบไม่สำเร็จ พร้อมปุ่มลองใหม่ โดยไม่ต้องกรอกข้อมูลซ้ำ

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, Server Actions)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — เก็บข้อมูลเป็นไฟล์ SQLite เดียว
- [Recharts](https://recharts.org/) — กราฟสรุปผลบน dashboard

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.