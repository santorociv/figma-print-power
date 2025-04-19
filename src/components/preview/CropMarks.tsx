
interface CropMarksProps {
  scale: number;
  bleedSize: number;
  showBleedMarks: boolean;
}

const CropMarks = ({ scale, bleedSize, showBleedMarks }: CropMarksProps) => {
  const markLength = 10 * scale;
  const markOffset = 5 * scale;

  return (
    <>
      {/* Top-left corner */}
      <div className="absolute" style={{ 
        left: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
        top: showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
        width: markLength, 
        height: 1, 
        backgroundColor: '#000' 
      }} />
      <div className="absolute" style={{ 
        left: showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
        top: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
        width: 1, 
        height: markLength, 
        backgroundColor: '#000'
      }} />
      
      {/* Top-right corner */}
      <div className="absolute" style={{ 
        right: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
        top: showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
        width: markLength, 
        height: 1, 
        backgroundColor: '#000' 
      }} />
      <div className="absolute" style={{ 
        right: showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
        top: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
        width: 1, 
        height: markLength, 
        backgroundColor: '#000'
      }} />
      
      {/* Bottom-left corner */}
      <div className="absolute" style={{ 
        left: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
        bottom: showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
        width: markLength, 
        height: 1, 
        backgroundColor: '#000' 
      }} />
      <div className="absolute" style={{ 
        left: showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
        bottom: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
        width: 1, 
        height: markLength, 
        backgroundColor: '#000'
      }} />
      
      {/* Bottom-right corner */}
      <div className="absolute" style={{ 
        right: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset, 
        bottom: showBleedMarks ? bleedSize * scale - markOffset : -markOffset,
        width: markLength, 
        height: 1, 
        backgroundColor: '#000' 
      }} />
      <div className="absolute" style={{ 
        right: showBleedMarks ? bleedSize * scale - markOffset : -markOffset, 
        bottom: showBleedMarks ? bleedSize * scale - markLength - markOffset : -markLength - markOffset,
        width: 1, 
        height: markLength, 
        backgroundColor: '#000'
      }} />
    </>
  );
};

export default CropMarks;
