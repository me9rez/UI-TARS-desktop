import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';
import { formatTimestamp } from '@/common/utils/formatters';
import { useTool } from '@/common/hooks/useTool';
import { StandardPanelContent } from '../types/panelContent';

interface WorkspaceHeaderProps {
  panelContent: StandardPanelContent;
  onBack: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ panelContent, onBack }) => {
  const { getToolIcon } = useTool();

  const isResearchReport = panelContent.toolCallId?.startsWith('final-answer');

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b workspace-control-panel">
      <div className="flex items-center min-w-0 flex-1">
        {/* Back button - more compact and subtle */}
        <motion.button
          whileHover={{ scale: 1.02, x: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="mr-3 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 rounded-md transition-all duration-150"
          title="Back to workspace"
        >
          <FiArrowLeft size={16} />
        </motion.button>

        {/* Icon - smaller and more refined */}
        <div className="w-7 h-7 mr-3 rounded-lg flex items-center justify-center overflow-hidden relative flex-shrink-0 shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-700/30">
          {isResearchReport ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-accent-100/50 dark:from-accent-900/30 dark:to-accent-800/20" />
              <div className="relative z-10">
                <FiBookOpen className="text-accent-600 dark:text-accent-400" size={14} />
              </div>
            </>
          ) : (
            <>
              <div className={`absolute inset-0 ${getBackgroundGradient(panelContent.type)}`} />
              <div className="relative z-10">{getToolIcon(panelContent.type || 'other', 14)}</div>
            </>
          )}
        </div>

        {/* Content info - more compact typography */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h2 className="font-medium text-gray-900 dark:text-gray-100 text-base leading-tight truncate">
              {panelContent.title}
            </h2>
            <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0 font-mono">
              {formatTimestamp(panelContent.timestamp, true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getBackgroundGradient(type: string): string {
  const gradients: Record<string, string> = {
    search:
      'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10',
    browser:
      'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10',
    command:
      'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10',
    file: 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10',
    image: 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10',
    browser_vision_control:
      'bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-cyan-800/10',
  };

  return (
    gradients[type] ||
    'bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/10'
  );
}
