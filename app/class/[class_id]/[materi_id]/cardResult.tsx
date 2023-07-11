'use client'
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { userScores } from "@/types/interfaces";
import { BellRing, Loader2 } from "lucide-react";
import router from "next/router";
import { title } from "process";

interface Props{
    userScores: userScores;
    onTryAgain: ()=>void,
    isLoading: boolean
}


export default function CardResult({userScores,onTryAgain,isLoading}: Props) {
    
    return(
        <Card className="text-center my-2 lg:my-5">
            <CardHeader>
                <CardTitle className="text-3xl">Result</CardTitle>
            </CardHeader>
            <div className="grid lg:grid-cols-3 lg:gap-4 gap-2">
                <CardContent>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-2">
                            <h4 className="text-xl font-medium leading-none">
                            Your Score
                            </h4>
                            <p className="flex justify-center items-center">
                            <span className="text-2xl font-bold text-teal-500">{Math.round(userScores.your_score)}</span> &nbsp;/&nbsp;
                            <span className="inline-block text-sm">100</span>
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-2">
                            <h4 className="text-xl font-medium leading-none">
                            Correct
                            </h4>
                            <p className="text-2xl font-bold text-emerald-700">
                            {userScores.correct}
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-2">
                            <h4 className="text-xl font-medium leading-none">
                            Wrong
                            </h4>
                            <p className="text-2xl font-bold text-rose-500">
                            {userScores.wrong}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="flex justify-center">
                <Button
                onClick={onTryAgain}
                >
                    {
                        isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    }
                    Try Again
                </Button>
            </CardFooter>
        </Card>
    )
}