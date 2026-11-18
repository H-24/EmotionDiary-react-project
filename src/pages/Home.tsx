import Button from '../components/Button';
import Header from '../components/Header';
import DiaryList from '../components/DiaryList';
import { useContext, useState } from 'react';
import { DiaryStateContext } from '../App';

const getMonthlyData = (pivotDate, data) => {
        // 1. 해당 월의 시작 시간 구하기
        // 2. 해당 월의 마지막 시간 구하기
        // 3. 해당 범위에 포함되는 데이터만 반환

        const beginTime = new Date(
            pivotDate.getFullYear(),
            pivotDate.getMonth(),
            1,
            0,
            0,
            0
        ).getTime();

        const endTime = new Date(
            pivotDate.getFullYear(),
            pivotDate.getMonth() + 1,
            1 
        ).getTime();

        return data.filter(
            (item) => 
                beginTime <= item.createdDate && item.createdDate < endTime
        )
    }

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    
    const monthlyData = getMonthlyData(pivotDate, data);

    const onIncreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
        );
    };

    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
        );
    };

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={'<'} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={'>'} onClick={onIncreaseMonth}/>}
            />
            <DiaryList data={monthlyData}/>
        </div>
    );
};

export default Home;