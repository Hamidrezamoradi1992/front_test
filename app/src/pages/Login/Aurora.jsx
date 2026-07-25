import FloatingBlob from "./FloatingBlob";

export default function Aurora() {
  return (
    <>
      <FloatingBlob
        size={500}
        color="#7C3AED"
        top="-10%"
        left="-10%"
        duration={18}
      />

      <FloatingBlob
        size={450}
        color="#2563EB"
        top="50%"
        right="-10%"
        duration={22}
      />

      <FloatingBlob
        size={380}
        color="#EC4899"
        bottom="-10%"
        left="35%"
        duration={20}
      />
    </>
  );
}
