import colorList from "@/shared/styles/color"

export const parseDataToChips = (data:any) => {
    if (!Array.isArray(data)) {
        console.error("Invalid data: expected an array");
        return []; 
      }
    const chipGroups = [];
  
    const translateXVariants = [
      ["translateX(0)", "translateX(-12%)", "translateX(-60%)"],
      ["translateX(0)", "translateX(-29%)", "translateX(-68%)"],
      ["translateX(0)", "translateX(-30%)", "translateX(-67%)"],
      ["translateX(0)", "translateX(-30%)", "translateX(-68%)"],
      ["translateX(0)", "translateX(-35%)", "translateX(-67%)"],
    ];
  
    const leftVariants = [
      ["0px", "-200px", "-100px"],
      ["0px", "-50px", "-30px"],
      ["0px", "-50px", "-30px"],
      ["0px", "-50px", "-30px"],
      ["0px", "0px", "-30px"],
    ];
  
    const widthVariants = [
      ["180px", "400px", "417px"],
      ["300px", "400px", "417px"],
      ["228px", "340px", "417px"],
      ["326px", "400px", "417px"],
      ["400px", "400px", "450px"],
    ];
  
    const colors = [colorList.black, colorList.white];
  
    for (let i = 0; i < data.length; i += 3) {
      const groupIndex = Math.floor(i / 3) % translateXVariants.length; 
      const translateXGroup = translateXVariants[groupIndex];
      const leftGroup = leftVariants[groupIndex];
      const widthGroup = widthVariants[groupIndex];
  
      const group = data.slice(i, i + 3).map((item:any, index:number) => ({
        id:item.id,
        status:item.status,
        text: item.content,
        color: colors[index % colors.length],
        textColor: colors[(index + 1) % colors.length], 
        width: widthGroup[index % widthGroup.length], 
        left: leftGroup[index % leftGroup.length],
        translateX: translateXGroup[index % translateXGroup.length], 
      }));
  
      chipGroups.push(group);
    }
  
    return chipGroups;
  };