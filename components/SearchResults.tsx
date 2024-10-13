"use client";

import { useSearchContext } from '@/context/SearchContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'; // 导入 Drawer 组件
import { useState } from 'react'; // 导入 useState

export default function SearchResults() {
  const { searchResults, pagination, setCurrentPage, isLoading } = useSearchContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 添加状态管理
  const [analysisContent, setAnalysisContent] = useState(''); // 添加状态以存储分析内容

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleShowAnalysis = (analysis: string) => {
    console.log(analysis)
    setAnalysisContent(analysis); // 设置分析内容
    setIsDrawerOpen(true); // 打开 Drawer
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((vuln) => (
          <Card key={vuln.id} className="max-w-full">
            <CardHeader className="py-3">
              <CardTitle className="text-base font-semibold">{vuln.source}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xs space-y-1">
                <p className="text-muted-foreground">
                  <span className="font-medium">语言：</span>{vuln.language}
                </p>
                <p>
                  <span className="font-medium">AI 摘要：</span>{vuln.aiSummary}
                </p>
                <p>
                  <span className="font-medium">数据来源：</span>CVE
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 text-xs py-1 px-2 h-auto"
                onClick={() => handleShowAnalysis('结果')}
              >
                显示AI分析结果
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {searchResults.length === 0 && (
        <p className="text-center text-muted-foreground">No vulnerabilities found</p>
      )}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </Button>
          <span className="self-center">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
      {/* Drawer 组件 */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction='right'>
        <DrawerContent className="h-[30vw] w-full right-0">
          <div className="mx-auto w-full">
            <DrawerHeader>
              <DrawerTitle>AI 分析结果</DrawerTitle>
              <DrawerDescription>以下是 AI 对您数据的分析</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">{analysisContent}</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">关闭</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
