import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BellRing } from "lucide-react";
import router from "next/router";
import { title } from "process";



export default function CardResult() {
    
    return(
        <Card className="text-center mt-2 lg:mt-5">
            <CardHeader>
                <CardTitle className="text-3xl">Result</CardTitle>
            </CardHeader>
            <div className="grid lg:grid-cols-3 lg:gap-4 gap-2">
                <CardContent>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <h4 className="text-xl font-medium leading-none">
                            Your Score
                            </h4>
                            <p className="text-sm text-muted-foreground">
                            0
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <h4 className="text-xl font-medium leading-none">
                            Correct
                            </h4>
                            <p className="text-sm text-muted-foreground">
                            0
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <h4 className="text-xl font-medium leading-none">
                            Wrong
                            </h4>
                            <p className="text-sm text-muted-foreground">
                            0
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="flex justify-center">
                <Button 
                >
                    Try Again
                </Button>
            </CardFooter>
        </Card>
    )
}