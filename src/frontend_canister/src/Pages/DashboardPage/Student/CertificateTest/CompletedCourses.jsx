import React from 'react'
import { Tab, Tabs,TabList, TabPanel } from "react-tabs";
import CourseCompletedCard from './CourseCompletedCard'
const CompletedCourses = () => {

    return (
        <div className="flex justify-start items-center w-full">
            <div className="w-full flex justify-start items-center">
                <Tabs className="pb-8 w-full">
                    <TabList className="flex px-[5px] pb-[30px] pt-[10px] gap-5">
                        <Tab>
                            Completed
                        </Tab>

                    </TabList>
                    <div className="w-full my-5">
                        <TabPanel>
                            <div className="flex items-center justify-center w-full my-8">
                                <CourseCompletedCard />
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default CompletedCourses