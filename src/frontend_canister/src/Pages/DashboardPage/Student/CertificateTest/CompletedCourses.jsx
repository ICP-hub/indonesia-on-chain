import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CourseCompletedCard from './CourseCompletedCard'
const CompletedCourses = () => {

    return (
        <div className="flex justify-start items-center w-full">
            <div className="w-full flex justify-start items-center">
                <Tabs className="pb-8 w-full">
                    <TabList>
                    </TabList>
                    <div className="w-full my-5">
                        <TabPanel>
                            <div className="flex items-center justify-center w-full ml-4 ">
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
