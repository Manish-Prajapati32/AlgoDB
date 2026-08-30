
import React, { useState, useEffect, useRef } from 'react';
import VisualizerShell from '../VisualizerShell';
import ArrayView from './ArrayView';
import SortView from './SortView';
import StackView from './StackVisualizer'; // Filename is StackVisualizer.tsx
import LinkedListView from './LinkedListView';
import TreeView from './TreeView';
import SearchView from './SearchView';
import { AnimationFrame } from '../../types';

interface DSAVisualizerProps {
  topicId: string;
}

const DSAVisualizer: React.FC<DSAVisualizerProps> = ({ topicId }) => {
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFrames([]);
    setCurrentFrameIdx(0);
    setIsPlaying(false);
  }, [topicId]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentFrameIdx(0);
  };
  const handleStepForward = () => {
    setCurrentFrameIdx(prev => Math.min(prev + 1, frames.length - 1));
  };
  const handleStepBack = () => {
    setCurrentFrameIdx(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentFrameIdx >= frames.length - 1) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setInterval(() => {
        setCurrentFrameIdx(prev => prev + 1);
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentFrameIdx, frames.length, speed]);

  const currentFrame = frames[currentFrameIdx] || { data: null, message: 'Initializing...' };

  const renderContent = () => {
    switch (topicId) {
      case 'array':
        return <ArrayView setFrames={setFrames} currentFrame={currentFrame} />;
      case 'sort':
        return <SortView setFrames={setFrames} currentFrame={currentFrame} />;
      case 'stack':
        return <StackView type="stack" setFrames={setFrames} currentFrame={currentFrame} />;
      case 'queue':
        return <StackView type="queue" setFrames={setFrames} currentFrame={currentFrame} />;
      case 'linkedlist':
        return <LinkedListView setFrames={setFrames} currentFrame={currentFrame} />;
      case 'tree':
        return <TreeView setFrames={setFrames} currentFrame={currentFrame} />;
      case 'search':
        return <SearchView setFrames={setFrames} currentFrame={currentFrame} />;
      default:
        return <div className="text-slate-400">Visualization for {topicId} coming soon!</div>;
    }
  };

  const metadata = getMetadata(topicId);

  return (
    <VisualizerShell
      title={metadata.title}
      description={metadata.description}
      complexity={metadata.complexity}
      explanation={currentFrame.message}
      pseudocode={metadata.pseudocode}
      controls={{
        onPlay: handlePlay,
        onPause: handlePause,
        onReset: handleReset,
        onStepBack: handleStepBack,
        onStepForward: handleStepForward,
        isPlaying,
        currentStep: frames.length > 0 ? currentFrameIdx + 1 : 0,
        totalSteps: frames.length,
        speed,
        setSpeed
      }}
    >
      {renderContent()}
    </VisualizerShell>
  );
};

const getMetadata = (id: string) => {
  switch (id) {
    case 'array':
      return {
        title: "Array Operations",
        description: "Explore how elements are stored, inserted, and deleted in a contiguous memory block.",
        complexity: { time: "O(n) for insert/delete", space: "O(n)" },
        pseudocode: `insert(idx, val):\n  shift right from n-1 to idx\n  arr[idx] = val\n\ndelete(idx):\n  shift left from idx to n-2\n  arr[n-1] = null`
      };
    case 'sort':
      return {
        title: "Bubble Sort",
        description: "Adjacent elements are compared and swapped if they are in the wrong order.",
        complexity: { time: "O(n²)", space: "O(1)" },
        pseudocode: `for i from 0 to n-1:\n  for j from 0 to n-i-1:\n    if arr[j] > arr[j+1]:\n      swap(arr[j], arr[j+1])`
      };
    case 'stack':
      return {
        title: "Stack (LIFO)",
        description: "Last-In, First-Out. Push and Pop operations at the TOP.",
        complexity: { time: "O(1)", space: "O(n)" },
        pseudocode: `push(v):\n  arr[++top] = v\n\npop():\n  return arr[top--]`
      };
    case 'queue':
      return {
        title: "Queue (FIFO)",
        description: "First-In, First-Out. Enqueue at REAR, Dequeue at FRONT.",
        complexity: { time: "O(1)", space: "O(n)" },
        pseudocode: `enqueue(v):\n  arr[++rear] = v\n\ndequeue():\n  return arr[front++]`
      };
    case 'linkedlist':
      return {
        title: "Linked List",
        description: "A linear collection of data elements where each element points to the next.",
        complexity: { time: "O(n) access, O(1) insert*", space: "O(n)" },
        pseudocode: `insertAtEnd(v):\n  new = Node(v)\n  temp = head\n  while temp.next != null:\n    temp = temp.next\n  temp.next = new`
      };
    case 'tree':
      return {
        title: "Binary Search Tree",
        description: "A hierarchical structure where left child < parent and right child > parent.",
        complexity: { time: "O(log n) average", space: "O(n)" },
        pseudocode: `insert(root, v):\n  if v < root.val:\n    if root.left is null:\n      root.left = Node(v)\n    else: insert(root.left, v)\n  else ...`
      };
    case 'search':
      return {
        title: "Binary Search",
        description: "An efficient algorithm for finding an item from a sorted list of items.",
        complexity: { time: "O(log n)", space: "O(1)" },
        pseudocode: `binarySearch(arr, target):\n  low = 0, high = n-1\n  while low <= high:\n    mid = (low + high) / 2\n    if arr[mid] == target: return mid\n    if arr[mid] < target: low = mid + 1\n    else: high = mid - 1`
      };
    default:
      return { title: id, description: '', complexity: { time: '', space: '' }, pseudocode: '' };
  }
};

export default DSAVisualizer;
