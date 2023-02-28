import React from 'react';
import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentGrade } from '../../app/features/grade/GradeSlice';
import { getPopularWorksheets, getWorksheets, getWorksheetsByGrades } from '../../app/features/worksheet/worksheetSlice';

function GradeComponent() {
  const { grades, currentGrade } = useSelector((state) => state.grades);

  const dispatch = useDispatch();

  const onGradeChangeHandler = async (e) => {
    const selectedGrade = await grades?.list?.find((grade) => grade?.title === e);
    await dispatch(setCurrentGrade(selectedGrade));
    await dispatch(
      getWorksheetsByGrades({
        gradeId: selectedGrade?._id
      })
    );
    await dispatch(
      getPopularWorksheets({
        limit: 100,
        gradeId: [selectedGrade?._id]
      })
    );
  };

  return (
    <div className='flex items-center justify-center pt-[20px]'>
      <span className='font-normal text-sm sm:pr-[20px]'>Grade</span>
      <Radio.Group value={currentGrade?.title} onChange={(e) => onGradeChangeHandler(e.target.value)} size='small' buttonStyle='solid' className='h-[60px] sm:h-auto flex flex-wrap sm:!max-w-full max-w-[320px] items-center justify-center'>
        {grades?.list?.map((grade) => (
          <Radio.Button value={`${grade.title}`} key={`${grade.title}`} className='mr-[10px] w-[58px] h-[25px] bg-[#D9D9D9] !rounded-[60px] text-xs text-center border-0 mb-[0px] sm:mb-0'>
            {grade.title}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}

export default GradeComponent;
